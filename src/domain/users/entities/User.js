class User {
  constructor(id, name, email, password, code, rol_id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.code = code;
    this.rol_id = rol_id;
  }
}

module.exports = User;
