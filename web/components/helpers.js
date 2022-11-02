const baseToastOptions = {
  position: 'is-bottom',
  duration: 4000,
  pauseOnHover: true,
}

export function apiError(error) {
  // eslint-disable-next-line no-console
  if (!error.response || !this) return console.error(error)

  this.$buefy.toast.open({
    message: `🤦 ${
      error.response?.data?.error?.message ?? "C'est un échec... "
    } (${error.response.status ?? 'ERR'})`,
    type: 'is-danger',
    ...baseToastOptions,
  })
}

export function isSuccess(message) {
  this.$buefy.toast.open({
    message,
    type: 'is-success',
    ...baseToastOptions,
  })
}
