job_name = "kaninchen-kindermode-legacy-staging"
priority = 50
service_tags = [
  "traefik.enable=true",
  "traefik.http.middlewares.kaninchen-legacy-auth.basicauth.users=kaninchen:$2y$05$hqOkmRjSHkb0pwyL4vAABupM6DnnbChxIKo.7Jojxii4g4vhdvzV.",
  "traefik.http.routers.kaninchen-kindermode-legacy-staging.entrypoints=http",
  "traefik.http.routers.kaninchen-kindermode-legacy-staging.rule=Host(`staging-www.kaninchen-kindermode.de`)",
  "traefik.http.routers.kaninchen-kindermode-legacy-staging.middlewares=kaninchen-legacy-auth"
]
resources = {
  cpu        = 50
  memory     = 64
  memory_max = 128
}
