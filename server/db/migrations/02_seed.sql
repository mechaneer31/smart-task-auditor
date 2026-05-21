TRUNCATE TABLE tasks, users RESTART IDENTITY CASCADE;


WITH inserted_users AS (
    INSERT INTO users (username, password, first_name, email)
    VALUES
    ('bob_tester', '$2b$10$qtRLQJxunpr/jMVxQfkAXuZzu630/WuUiGOvVZvccATRFdCgz3382', 'Bob', 'bob@example.com'),
    ('sally_dev', '$2b$10$oYx4kfp8MYQR6rA744u2F.9K0TVxfVIrLrvuZmJfJVEdf/rLnLf/m', 'Sally', 'sally@example.com'),
    ('frank_supv', '$2b$10$DXN09gT/s34HVyDCMRYZoeXMYOX0O4BYQuD7aOGpVUAkyRWK.9tqi', 'Frank', 'frank@example.com')
    RETURNING id, username
)



INSERT INTO tasks (user_id, title, description, is_complete, priority, category, due_date)
VALUES
(
    (SELECT id FROM inserted_users WHERE username = 'bob_tester'),
    'Test auth endpoints',
    'Validate create user and login endpoints function with no errors',
    'true',
    'Urgent',
    'Testing',
    NOW() - INTERVAL '2 days'
),
(
    (SELECT id FROM inserted_users WHERE username = 'bob_tester'),
    'Test user endpoints',
    'Validate user endpoints function with no errors',
    'false',
    'High',
    'Testing',
    NOW() + INTERVAL '2 days'
),
(
    (SELECT id FROM inserted_users WHERE username = 'bob_tester'),
    'Test tasks endpoints',
    'Validate endpoints function with no errors',
    'false',
    'Medium',
    'Testing',
    NOW() + INTERVAL '5 days'
),
(
    (SELECT id FROM inserted_users WHERE username = 'sally_dev'),
    'Complete Express backend optimization',
    'Implement global error handlers',
    'false',
    'Urgent',
    'Dev',
    NOW() + INTERVAL '2 days'
),
(
    (SELECT id FROM inserted_users WHERE username = 'sally_dev'),
    'Prepare Manual Postman Test Checklist',
    'Verify that user2 cannot maliciously alter data belonging to user3',
    'false',
    'High',
    'Dev',
    NOW() + INTERVAL '5 days'
)
