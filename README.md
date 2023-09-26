# Scrum_project
<h1 align="center" style="font-weight: 700">
G-Bay
</h1>

<div align="center">
<img src="./screenshots/preview_landing.png" width="75%">
</div>

## **Contents**

- [Description](#description)
- [How to Install and Run the Project](#configuration_guide)
  - [Extra Information: API](api/README.md)
  - [Extra Information: Client Side](client/README.md)
- [Features](#features)
- [Development Book](DEVBOOK.md)


## **Description**

G-Bay is an E-commerce Site for fans. As a buyer, you'll be able to create an account, edit your profile, filter results, and more. As a seller, you'll be able to see your listing of products, update their information, or remove them.

[React JS][reactjs] is used for Client-Side, [Laravel 8][laravel] as API, and [MySQL][mysql] as Database Service. In addition, [SCSS][sass] is used to style this project, but SCSS modules are not implemented.

The folder structure for the React App is based on this [article][folder].

[Package manager][pm]:

- React App: [npm][pm-npm]
- Laravel API: [composer][pm-composer]

## **Configuration Guide**

This project is not hosted online, but it's completely functional. To use G-Bay on your local device, it's necessary to follow some steps.

### **Requirements**

1. Install `PHP` on your computer. We recommend using XAMPP for this purpose, as the process is straightforward and you can complete it in a few minutes.

2. Should you chose to install `PHP` manually, after configuring your installation and `php.ini` file, install MySQL and a database administration tool of your choice (e.g., DBeaver, Datagrip) for setting up the project database and configuring your SQL server.

3. Download and Install the latest version of `Composer`.

4. Install `npm` package manager.

5. If you'd like to make style changes, be sure to configure or enable an SCSS compiler to be able to edit each component's stylesheets.

### **Clone repository**

```
  git clone git@github.com:NguyenVaT22092001/Scrum-project.git

  cd scrum-project
```

### **Install Dependecies**

**Folder Structure**

```
  -> scrum-project
    -> [...]
    -> backend
    -> frontend
    -> [...]
```

Run the following commands in your terminal

**API**

```
  cd backend

  // If 'composer' is installed correctly
  composer install

  // Alternative option
  php composer.phar install
```

**Client**

```
  cd frontend

  npm
```

### **Config**

**Database**

```
  cd backend

  php artisan migrate

  php artisan db:seed --class=DatabaseSeeder
```

The next command provides 500 products to our DB. If you want to modify the number of products, you should take a look at the `ProductSeeder.php` file or do not run this command.

```
  -> database
    -> seeders
      -> [...]
      -> ProductSeeder.php
      -> [...]
```

```
  php artisan db:seed --class=ProductSeeder
```

It's possible you face an issue after running the last command. To provide data to our DB, we use FakerPHP. Sadly, it returns unauthenticated users. To solve this issue, you have to modify the `Product.php` file.

```
  -> app
    -> Models
      -> [...]
      -> Product.php
      -> [...]
```

Please comment the line 34, run the last command, and uncomment the line of code.

<br>

Finally, run the next command.

```
  php artisan storage:link
```

**API**

```
  cd backend
```

Create a `.env` file based on the `.env.example` file. Add your credentials in the next section:

```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1s
  DB_PORT=3306
  DB_DATABASE=
  DB_USERNAME=
  DB_PASSWORD=
```

**Client**

```
  // If something goes wrong with the Client-Side,
  // you should take a look to the following files

  LoginSection.js
  SignUpSection.js
  apiClient.js
```

### **Development Server**

**API**

```
  php artisan serve
```

**Client**

```
  npm start
```

**Tip**

```
  Do not forget run MySQL server...
```

## **Features**

### **User**

- Implemented
  - Login
  - Create Account
    - Require agreement with terms and conditions
  - Edit Account
  - Reset Password
    - Email confirmation
  - Buy Items
  - Sell Items
- In Progress
  - Delete Accout

### **Stock**

- Implemented
  - Display Products available with pagination
  - Basic information for each product

### **Product**

- Implemented
  - Add Product to Stock
  - Update Product information on Stock
  - Single Product page
  - Filter by Products' name
  - Display statistics based on price
- In Progress
  - Filter by Categories
  - Delete Product from Stock

### **Statistics**

- Implemented
  - Stats based on product price
  - Display graphic

### **Cart**

- Implemented
  - Display products added to cart
  - Display quantity, total and subtotal
  - Update total and quantity of each product in cart



</article>
</td>
<td>


</article>
</td>
</table>

[gh-j]: https://github.com/jvondzerza
[gh-k]: https://github.com/katyaheylen
[gh-l]: https://github.com/Leweyse
[gh-m]: https://github.com/mesushanta

<!-- Extra Links -->

[becode]: https://becode.org/
[reactjs]: https://reactjs.org/
[laravel]: https://laravel.com/
[mysql]: https://www.mysql.com/
[sass]: https://sass-lang.com/
[folder]: https://www.sitepoint.com/react-architecture-best-practices/
[pm]: https://en.wikipedia.org/wiki/Package_manager#:~:text=A%20package%20manager%20or%20package,computer%20in%20a%20consistent%20manner.&text=Package%20managers%20are%20designed%20to,for%20manual%20installs%20and%20updates.
[pm-npm]: https://www.npmjs.com/
[pm-composer]: https://getcomposer.org/
****
