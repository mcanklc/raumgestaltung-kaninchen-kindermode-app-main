// allow nomad-pack to set the job name

[[- define "job_name" -]]
[[- if eq .kaninchen.job_name "" -]]
[[- .nomad_pack.pack.name -]]
[[- else -]]
[[- .kaninchen.job_name -]]
[[- end -]]
[[- end -]]
