const pool = require('./dbconfig');

const createTables = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS cuenta CASCADE;');
    await pool.query('DROP TABLE IF EXISTS cliente CASCADE;');
    await pool.query('DROP TABLE IF EXISTS sys_user CASCADE;');
    await pool.query('DROP TABLE IF EXISTS friendship CASCADE;');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sys_user (
        usuario char(25) NOT NULL PRIMARY KEY,
        password char(60) NOT NULL
    );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cliente (
        usuario char(25) NOT NULL PRIMARY KEY,
        nombre char(50) NOT NULL,
        apellido char(50) NOT NULL,
        pais char(50) NOT NULL,
        provincia char(50) NOT NULL,
        ciudad char(50) NOT NULL,
        calle char(50) NOT NULL,
        altura int NOT NULL,
        departamento char(4) NOT NULL,
        telefono char(15) NOT NULL,
        dni char(8) NOT NULL,
        cuit char(11) NOT NULL,
        email char(50) NOT NULL,
        cbu char(22) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cuenta (
        usuario char(25) NOT NULL PRIMARY KEY,
        nroCuenta char(20) NOT NULL,
        saldo decimal(10,2) NOT NULL,
        CONSTRAINT fk_cliente FOREIGN KEY (usuario) REFERENCES cliente(usuario)
      );
    `);

    await pool.query(`
      CREATE TABLE friendship (
        usuario1 char(25) NOT NULL,
        usuario2 char(25) NOT NULL
      );
    `);

    await pool.query(`
        INSERT INTO sys_user VALUES ('admin', 'admin');
        INSERT INTO sys_user VALUES ('juanperez', '1234');
        INSERT INTO sys_user VALUES ('lauFe91', 'BAGUVIX');
        INSERT INTO sys_user VALUES ('Charly67', 'charlycharli44te');
        INSERT INTO sys_user VALUES ('AnFe', 'AEZAKMI');
        INSERT INTO sys_user VALUES ('MRodriguez2', '09.12.18.BERNABEU');
        INSERT INTO sys_user VALUES ('AnLo', 'HESOYAM');
        INSERT INTO sys_user VALUES ('Luc14L0P3Z', 'IAVENJQ ');
        INSERT INTO sys_user VALUES ('usuarioP', 'UZUMYMW');
    `);

    await pool.query(`
        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('juanperez', 'Juan', 'Pérez', 'Argentina', 'Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Avenida Corrientes', 1234, '2A', '1130556673', '12345678', '20123456780', 'juan@example.com', '1234567890123456789012');

        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('lauFe91', 'María', 'González', 'Argentina', 'Buenos Aires', 'La Plata', 'Calle 7', 432, 'B', '1145678901', '87654321', '27123456789', 'maria@example.com', '0987654321098765432109');

        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('Charly67', 'Carlos', 'López', 'Argentina', 'Córdoba', 'Córdoba', 'Avenida Colón', 987, 'C', '1156789012', '76543210', '23123456789', 'carlos@example.com', '5678901234567890123456');

        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('AnFe', 'Laura', 'Fernández', 'Argentina', 'Buenos Aires', 'Quilmes', 'Calle Lavalle', 567, 'D', '1167890123', '43210987', '26123456789', 'laura@example.com', '6789012345678901234567');

        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('MRodriguez2', 'Martín', 'Rodríguez', 'Argentina', 'Buenos Aires', 'Mar del Plata', 'Avenida Independencia', 789, 'E', '1178901234', '10987654', '24123456789', 'martin@example.com', '8901234567890123456789');

        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('AnLo', 'Ana', 'López', 'Argentina', 'Santa Fe', 'Rosario', 'Calle San Juan', 456, 'F', '1189012345', '98765432', '21123456789', 'ana@example.com', '0123456789012345678901');

        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('usuarioP', 'Pedro', 'García', 'Argentina', 'Buenos Aires', 'Lomas de Zamora', 'Avenida Hipólito Yrigoyen', 9876, 'G', '1190123456', '87654321', '22123456789', 'pedro@example.com', '1234567890123456789012');

        INSERT INTO cliente (usuario, nombre, apellido, pais, provincia, ciudad, calle, altura, departamento, telefono, dni, cuit, email, cbu)
        VALUES ('Luc14L0P3Z', 'Lucía', 'López', 'Argentina', 'Buenos Aires', 'Tigre', 'Calle Mendoza', 321, 'H', '1123456789', '76543210', '23123456789', 'lucia@example.com', '2345678901234567890123');
    `);

    await pool.query(`
        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('juanperez', '00000000000567346122', 15000.00);

        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('lauFe91', '00000000000441870667', 10000.00);

        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('Charly67', '00000000000222563122', 7500.50);

        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('AnFe', '00000000000877673321', 3000.75);

        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('MRodriguez2', '00000000000888766743', 220000.00);

        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('AnLo', '00000000000022387765', 1500.25);

        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('usuarioP', '00000000000012233654', 15000.00);

        INSERT INTO cuenta (usuario, nroCuenta, saldo)
        VALUES ('Luc14L0P3Z', '00000000000778555712', 1000.50);
    `);

    await pool.query(`
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('juanperez', 'AnFe');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('lauFe91', 'AnFe');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('Charly67', 'AnLo');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('AnLo', 'Luc14L0P3Z');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('MRodriguez2', 'usuarioP');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('usuarioP', 'PedroG');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('Luc14L0P3Z', 'juanperez');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('juanperez', 'Luc14L0P3Z');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('AnFe', 'MRodriguez2');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('Charly67', 'lauFe91');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('AnLo', 'juanperez');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('lauFe91', 'MRodriguez2');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('Luc14L0P3Z', 'AnLo');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('MRodriguez2', 'AnFe');
        
        INSERT INTO friendship (usuario1, usuario2)
        VALUES ('PedroG', 'lauFe91');
        
    `);

    console.log('Tables created successfully!');
    } catch (error) {
    console.error('Error creating tables:', error);
    };
}

module.exports = createTables;
