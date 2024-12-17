job "[[ template "job_name" . ]]" {
  datacenters = ["hel1"]
  type        = "service"
  priority    = [[ .kaninchen.priority ]]

  group "[[ template "job_name" . ]]" {
    count = 1

    network {
      port "http" {}
    }

    restart {
      attempts = 10
      interval = "5m"
      delay    = "25s"
      mode     = "delay"
    }

    service {
      name     = "[[ template "job_name" . ]]"
      provider = "nomad"
      port     = "http"
      tags = [
      [[- range $key, $value := .kaninchen.service_tags ]]
        "[[ $value ]]",
      [[- end ]]
      ]

      check {
        type     = "http"
        path     = "/health"
        interval = "10s"
        timeout  = "2s"
      }
    }

    task "[[ template "job_name" . ]]" {
      driver = "docker"

      config {
        image = "ghcr.io/jrvs-de/kaninchen-kindermode-app:[[ .kaninchen.tag ]]"
        ports = ["http"]
      }

      template {
        destination = "${NOMAD_SECRETS_DIR}/env.vars"
        env         = true
        change_mode = "restart"
        data        = <<EOT
{{- if nomadVarExists "nomad/jobs/[[ template "job_name" . ]]" }}
  {{- with nomadVar "nomad/jobs/[[ template "job_name" . ]]" }}
    {{- range .Tuples }}
{{ .K | toUpper }}={{ .V | toJSON }}
    {{- end }}
  {{- end }}
{{- end }}
EOT
      }

      env {
        PORT = "${NOMAD_PORT_http}"
      }

      resources {
        cpu        = [[ .kaninchen.resources.cpu ]]
        memory     = [[ .kaninchen.resources.memory ]]
        memory_max = [[ .kaninchen.resources.memory_max ]]
      }
    }
  }
}
