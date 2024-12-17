variable "job_name" {
  description = "The name of the job"
  type        = string
  default     = "kaninchen-kindermode-legacy"
}

variable "datacenters" {
  description = "List of datacenters to deploy to"
  type        = list(string)
  default     = ["hel1"]
}

variable "priority" {
  description = "The priority of the job"
  type        = number
  default     = 100
}

variable "service_tags" {
  description = "The service tags to use"
  type        = list(string)
  default = [
    "traefik.enable=true",
    "traefik.http.routers.kaninchen-kindermode-legacy.entrypoints=http",
    "traefik.http.routers.kaninchen-kindermode-legacy.rule=Host(`www.kaninchen-kindermode.de`, `kaninchen-kindermode.de`)",
    "traefik.http.routers.kaninchen-kindermode-legacy.middlewares=redirect-to-www@file"
  ]
}

variable "tag" {
  description = "The docker tag to use"
  type        = string
  default     = "latest"
}

variable "resources" {
  description = "The resource to assign to the application"
  type = object({
    cpu        = number
    memory     = number
    memory_max = number
  })

  default = {
    cpu        = 50
    memory     = 128
    memory_max = 256
  }
}
