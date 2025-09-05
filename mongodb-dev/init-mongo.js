// MongoDB initialization script for Todo List application
print('🚀 Starting MongoDB initialization...');

// Switch to todolist database
db = db.getSiblingDB('todolist');

// Create application user for the todolist database
db.createUser({
  user: 'todoapp',
  pwd: 'todopassword123',
  roles: [
    {
      role: 'readWrite',
      db: 'todolist'
    }
  ]
});

print('✅ MongoDB initialization completed!');
print('👤 Application user created: todoapp');
print('🗄️ Database ready: todolist');
print('� Authentication enabled');
