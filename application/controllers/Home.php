<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    public function index() {

        // Cargar la vista del header
        $this->load->view('templates/header_admin');

        // Cargar la vista principal
        $this->load->view('Home/home');

        // carga la vista del navbar
        $this->load->view('templates/nav_admin');
        

        // Cargar la vista del footer
        $this->load->view('templates/footer_admin');
    }
}
?>
