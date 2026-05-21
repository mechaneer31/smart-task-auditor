CREATE TYPE task_priority AS ENUM ('Low', 'Medium', 'High', 'Urgent');

CREATE TABLE IF NOT EXISTS users(
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(255) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    first_name      VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL DEFAULT 'example@example.com',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    description     TEXT DEFAULT NULL,
    is_complete     BOOLEAN DEFAULT false,
    priority        task_priority DEFAULT 'Medium',
    category        VARCHAR(255) DEFAULT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    due_date        TIMESTAMPTZ,
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);