<?php

// Définition de l'adresse email de réception pour le formulaire de contact
$receiving_email_address = 'souamyjp@hotmail.com';

// Vérifie si le fichier "php-email-form.php" existe dans le chemin spécifié
// Ce fichier contient la bibliothèque nécessaire pour gérer l'envoi d'emails
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form); // Inclut le fichier pour permettre l'accès à ses fonctionnalités
} else {
  die('Unable to load the "PHP Email Form" Library!'); // Arrête l'exécution si le fichier est introuvable
}

// Création d'une instance de la classe définie dans "php-email-form.php"
$contact = new $PHP_EMAIL_FORM;

// Active le mode AJAX pour les soumissions du formulaire
$contact->ajax = true;

// Configuration des propriétés principales pour l'email
$contact->to = $receiving_email_address; // Adresse email de réception
$contact->from_name = $_POST['name']; // Récupération du nom depuis le formulaire
$contact->from_email = $_POST['email']; // Récupération de l'email depuis le formulaire
$contact->subject = $_POST['subject']; // Récupération du sujet depuis le formulaire

// Ajout des messages au corps de l'email
$contact->add_message($_POST['name'], 'From'); // Ajoute le nom en tant qu'expéditeur
$contact->add_message($_POST['email'], 'Email'); // Ajoute l'email
$contact->add_message($_POST['message'], 'Message', 10); // Ajoute le message principal, avec une priorité de 10

// Envoi de l'email et affichage du résultat
echo $contact->send();
