CREATE TABLE public.courses (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    image_url TEXT,
    position INT
);

INSERT INTO public.courses (id, name, description, created_at, updated_at, image_url, position) VALUES
('a1efb77e-e386-4c5c-84b8-c94a076d2e3d', 'Angular Full Course', 'Master Angular from scratch and learn how to build production-ready applications', '2024-12-30', '2024-12-30', 'https://openfeature.dev/assets/images/angular-e44fde5f13b7a1133f850e29d4ff0304.png', 1),
('854da82d-b4fd-439c-871c-ad887c3bdaaf', 'Vue.js', 'Learn the fundamentals of Vue.js', '2024-12-30', '2024-12-30', 'https://runcode-app-public.s3.amazonaws.com/images/vuejs-online-editor-compiler.original.png', 2),
('ea6984c9-9d4b-4fdb-9016-e1a4397ad3f6', 'Node.js', 'Learn the fundamentals of Node.js and build scalable backend applications', '2024-12-30', '2024-12-30', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', 4),
('d096575f-ce61-45fa-a0c0-6c60a7e4319d', 'Java', 'Learn the fundamentals of Java programming and object-oriented concepts', '2024-12-30', '2024-12-30', 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg', 5),
('5ddc1196-4949-4b6b-aeb8-f74069a2b1c6', 'Python', 'Discover Python programming and its use in data science and web development', '2024-12-30', '2024-12-30', 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', 6),
('7db692f6-c781-41d9-97f8-989ad9bce9c0', 'MySQL', 'Learn how to manage relational databases using MySQL', '2024-12-30', '2024-12-30', 'https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg', 7),
('fc24ef5e-242d-44f7-aad4-131d8d967fba', 'PostgreSQL', 'Understand and use PostgreSQL for advanced database management', '2024-12-30', '2024-12-30', 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg', 8),
('8e0d7de9-c2b5-406a-b42a-1c642dbb382e', 'Docker', 'Master containerization with Docker to build scalable applications', '2024-12-30', '2024-12-30', 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png', 9),
('0de39780-b98b-465f-ad96-000a92146182', 'React JS', 'Learn the fundamentals of React.js', '2024-12-30', '2024-12-30', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ5xTmR1y7vS0lXIk7dhqrIBzDJQGq1XN9nQ&s', NULL),
('7d318c01-e666-42ee-91a9-e8e00721a20f', 'Kubernetes', 'Learn Kubernetes for orchestration of containerized applications', '2024-12-30', '2024-12-30', 'https://kubernetes.io/images/kubernetes-horizontal-color.png', 10),
('08b74d13-d1b7-4c83-a652-736bb668537a', 'Spring', 'Master Spring Framework to build enterprise-level Java applications', '2024-12-30', '2024-12-30', 'https://miro.medium.com/v2/resize:fit:490/1*aRUnth2T7XPMwCpMHrjfyQ.png', 11),
('bf9fb93e-d7fc-4a6a-a545-bec565a25cda', 'MongoDB', 'Learn NoSQL database management with MongoDB', '2024-12-30', '2024-12-30', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuhkQN39A5Ldg6DFiEz8HZ0MrUTiM8nG8DGg&s', 12);

CREATE TABLE public.roles (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE -- <- Corrigido aqui
);

INSERT INTO public.roles (id, name) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER');

CREATE TABLE public.users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL REFERENCES public.roles(name)
);

INSERT INTO public.users (id, email, name, password, role) VALUES
('2bde38dd-54c7-425c-b84d-40982cb8591c', 'luh@gmail.com', 'Luiz', '$2a$10$4aX4j0Sk7ROXeH6pMWqHH.hcFoTCBRJqwYX3ipsYg34DOeCwoTv4y', 'ROLE_USER'),
('08a2dd11-2fa3-41ce-baf2-8bf11ca1b6b6', 'admin@example.com', 'admin', '$2a$10$CPISKINDnNWeBLCgb06cSeaQxNkjhla3W0l1NFLMZUrOoUiYHXucu', 'ROLE_ADMIN');
