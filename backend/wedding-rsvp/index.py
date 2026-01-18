import json
import os
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    """Обрабатывает заявки на регистрацию гостей свадьбы и отправляет уведомления в Telegram"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', 'Не указано')
        attendance = body.get('attendance', 'Не указано')
        guests = body.get('guests', '1')
        alcohol = body.get('alcohol', [])
        alcohol_priority = body.get('alcoholPriority', [])
        message = body.get('message', '')
        
        attendance_text = 'Буду присутствовать' if attendance == 'yes' else 'Не смогу прийти'
        
        telegram_message = f"Новая регистрация на свадьбу!\n\n"
        telegram_message += f"Имя: {name}\n"
        telegram_message += f"Статус: {attendance_text}\n"
        
        if attendance == 'yes':
            telegram_message += f"Количество гостей: {guests}\n"
            
            if alcohol:
                telegram_message += f"\nАлкогольные предпочтения:\n"
                for drink in alcohol:
                    telegram_message += f"  - {drink}\n"
            
            if alcohol_priority:
                telegram_message += f"\nПриоритеты напитков:\n"
                priority_dict = {}
                for item in alcohol_priority:
                    if ':' in item:
                        drink, priority = item.split(':', 1)
                        priority_dict[drink] = priority
                
                sorted_priorities = sorted(priority_dict.items(), key=lambda x: int(x[1]) if x[1].isdigit() else 999)
                for drink, priority in sorted_priorities:
                    telegram_message += f"  {priority}. {drink}\n"
        
        if message:
            telegram_message += f"\nКомментарий:\n{message}"
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if bot_token and chat_id:
            telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            telegram_data = urllib.parse.urlencode({
                'chat_id': chat_id,
                'text': telegram_message
            }).encode('utf-8')
            
            req = urllib.request.Request(
                telegram_url,
                data=telegram_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            
            with urllib.request.urlopen(req) as response:
                telegram_response = json.loads(response.read().decode('utf-8'))
            
            if not telegram_response.get('ok'):
                raise Exception(f"Telegram API error: {telegram_response}")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Ваш ответ принят!'
            }),
            'isBase64Encoded': False
        }
        
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'HTTP Error {e.code}: {error_body}'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }