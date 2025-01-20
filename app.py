from flask import Flask, request, jsonify

app = Flask(__name__)

tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    task = request.json.get('task')
    tasks.append(task)
    return jsonify({"message": "Task added successfully!"}), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    if task_id < len(tasks):
        tasks.pop(task_id)
        return jsonify({"message": "Task deleted successfully!"})
    return jsonify({"message": "Task not found!"}), 404

if __name__ == '__main__':
    app.run(debug=True)
