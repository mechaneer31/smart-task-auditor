TRUNCATE TABLE tasks;

ALTER TABLE tasks
ALTER COLUMN priority DROP DEFAULT;

CREATE TYPE task_priority AS ENUM ('Low', 'Medium', 'High', 'Urgent');

ALTER TABLE tasks
ALTER COLUMN priority TYPE task_priority
USING priority::task_priority;

ALTER TABLE tasks
ALTER COLUMN priority SET DEFAULT 'Medium'::task_priority;