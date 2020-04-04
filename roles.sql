COPY public.roles (id, name) FROM stdin;
1	admin
2	manager
3	guest
\.

SELECT pg_catalog.setval('public.roles_id_seq', 4, false);