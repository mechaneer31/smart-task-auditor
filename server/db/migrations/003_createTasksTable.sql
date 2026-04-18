



CREATE TABLE IF NOT EXISTS tasks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    description     TEXT DEFAULT NULL,
    is_complete     BOOLEAN DEFAULT false,
    priority        VARCHAR(255) DEFAULT NULL,
    category        VARCHAR(255) DEFAULT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE
);


