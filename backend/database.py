import psycopg2

db_params = {
    'dbname': 'Instagram',
    'user': '',
    'password': '',
    'host': 'localhost',
    'port': '5432',
}


def execute_query(query, params=None, fetchone=False,fetchall=False):
    connection = psycopg2.connect(**db_params)
    cursor = connection.cursor()

    cursor.execute(query, params)

    if fetchone:
        result = cursor.fetchone()
    elif fetchall:
        result= cursor.fetchall()
    else:
        result = None

    connection.commit()
    cursor.close()
    connection.close()

    return result
