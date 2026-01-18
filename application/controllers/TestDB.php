<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TestDB extends CI_Controller {

    public function index() {
        // Cargar la librería de base de datos
        $this->load->database();
        
        // Probar si la base de datos está conectada
        if ($this->db->conn_id) {
            echo "Conexión exitosa a la base de datos.";
        } else {
            echo "Error al conectar a la base de datos.";
        }
    }
}
