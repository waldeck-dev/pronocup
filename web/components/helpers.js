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

export function getEmojiNumber(n) {
  if (n < 0 || n > 10) return '🔢'

  return {
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    10: '🔟',
  }[n]
}
