class Views{

  constructor(){
    this.loginHTML = `
      <main class="login-container">
        <section>
              <h1>My Data Feelings Log</h1>
              <p>A generative data visualization of my feelings submitted every day.</p>
          </section>
          <section>
          <h2 class="heading">Log in or signup</h2>
          <form class="form">
              <fieldset>
                <input class="block" type="email" name="email" placeholder="email">
              </fieldset>
      
              <fieldset>
                <input class="block" type="password" name="password" placeholder="password">
              </fieldset>
      
              <button type="button" id="login" class="">
                Log in
              </button>
      
              <button type="button" id="signup" class="">
                Sign up and log in
              </button>
            </form>
          </div>
          <section>
      </main>
    `

    this.visHTML = `
      <main>
          <header>
              <h1>My Data Feelings <small class="btn" id="admin">⚙︎</small><small id="logout"  class="btn" style="font-size:12px; margin-left:20px; cursor:pointer">logout</small></h1>
              <p>This is a series of daily visuals generated from my data feelings </p>
              
          </header>
            <!-- all of our sketches will be added here -->
            <section class="grid-container" id="vis-grid"></section>
      </main>
      `

    this.adminHTML = `
      <main id="admin-panel">
        <header>
              <h1>Data Feelings Admin Console</h1>
              <p>Use the various inputs to submit data about your mood</p>
              <small class="btn" style="text-decoration:underline" id="vis">🔙 back to viz</small>
          </header>
        <button type="button" id="submitFeeling">
          Add My Feeling
        </button>
      </main>
    `
  }

}
