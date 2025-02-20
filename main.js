const app = document.getElementById('app')

// Array, vetor, lista
const users = [
  {
    email: 'test@test.com',
    phone: '999999999',
    ref: 100,
    refBy: null
  },

  {
    email: 'tust@tust.com',
    phone: '999999999',
    ref: 200,
    refBy: 100
  },

  {
    email: 'tost@tost.com',
    phone: '999999999',
    ref: 300,
    refBy: 200
  },

  {
    email: 'tast@tast.com',
    phone: '999999999',
    ref: 300,
    refBy: 100
  },

  {
    email: 'tist@tist.com',
    phone: '999999999',
    ref: 300,
    refBy: 100
  }
]

const getUser = userData => {
  return users.find(user => {
    return user.email === userData.email
  })
}

const getTotalSubscribers = userData => {
  const subs = users.filter(user => {
    return user.refBy === userData.ref
  })

  return subs.length
}

const showInvite = userData => {
  app.innerHTML = `
    <main>
      <h3>Inscrição confirmada!</h3>

      <p>
        Convide mais pessoas e concorra a prêmios! <br />
        Compartilhe o link e acompanhe as inscrições:
      </p>

      <div class="input-group">
        <label for="link">
          <img src="./assets/link.svg" alt="" />
        </label>

        <input type="text" id="link" value="https://evento.com?ref=${
          userData.ref
        }" disabled />
      </div>

      <section class="stats">
        <h4>${getTotalSubscribers(userData)}</h4>

        <p>Inscrições feitas</p>
      </section>
    </main>
  `

  app.setAttribute('class', 'page-invite')
}

const saveUser = userData => {
  const newUser = {
    ...userData,
    ref: Math.round(Math.random() * 4000),
    refBy: 100
  }

  users.push(newUser)

  return newUser
}

const formAction = () => {
  const form = document.getElementById('form')

  form.onsubmit = event => {
    event.preventDefault()

    const formData = new FormData(form)
    const userData = {
      email: formData.get('e-mail'),
      phone: formData.get('phone')
    }

    const user = getUser(userData)

    if (user) {
      showInvite(user)
    } else {
      const newUser = saveUser(userData)
      showInvite(newUser)
    }
  }
}

const startApp = () => {
  const content = `
    <main>
      <section class="about">
        <div class="section-header">
          <h2>Sobre o evento</h2>
          <span class="badge"><img src="./assets/radio.svg" alt="Radio icon" /> Ao Vivo</span>
        </div>

        <p>
          Um evento feito por e para pessoas desenvolvedoras apaixonadas por
          criar soluções inovadoras e compartilhar conhecimento. Vamos
          mergulhar nas tendências mais recentes em desenvolvimento de
          software, arquitetura de sistemas e tecnologias emergentes, com
          palestras, workshops e hackathons. <br /><br />
          Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
        </p>
      </section>

      <section class="registration">
        <h2>Inscrição</h2>

        <form action="form" id="form">
          <div class="input-wrapper">
            <div class="input-group">
              <label for="e-mail">
                <img src="./assets/mail.svg" alt="E-mail icon" />
              </label>
              <input type="email" id="e-mail" name="e-mail" placeholder="E-mail" />
            </div>

            <div class="input-group">
              <label for="phone">
                <img src="./assets/phone.svg" alt="Phone icon" />
              </label>
              <input type="text" id="phone" name="phone" placeholder="Telefone" />
            </div>
          </div>

          <button>
            Confirmar

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L16.5858 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H16.5858L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289Z" fill="#6F9DE2"/>
            </svg>
          </button>
        </form>
      </section>
    </main>
  `

  app.innerHTML = content
  app.setAttribute('class', 'page-start')

  formAction()
}

startApp()

document.querySelector('header').onclick = () => startApp()
