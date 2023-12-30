# CryptoSwap Backend

Welcome to the Crypto Swap backend repository! This server-side component complements the Crypto Swap frontend, providing the necessary APIs for seamless cryptocurrency transactions and management. The server is hosted at [bitmosys-q423-server.onrender.com](https://bitmosys-q423-server.onrender.com/) and the client repository can be found [here](https://github.com/prabalbhandari04/BITMOSYS-Q423_client).

## Table of Contents

1. [Deployment](#deployment)
2. [Installation](#installation)
3. [Features](#features)
   - [Buy Crypto](#buy-crypto)
   - [Exchange Crypto](#exchange-crypto)
   - [Wallet Information](#wallet-information)
   - [Crypto Operations](#crypto-operations)
   - [Admin Dashboard (Future Expansion)](#admin-dashboard)
4. [Middleware and Authentication](#middleware-and-authentication)
5. [File Structure](#file-structure)
6. [Contributing](#contributing)
7. [License](#license)

## Deployment

To access the live backend of Crypto Swap, visit [bitmosys-q423-server.onrender.com](https://bitmosys-q423-server.onrender.com/).

## Installation

To set up the Crypto Swap backend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/prabalbhandari04/BITMOSYS-Q423-server

2. Navigate to folder:

   ```bash
   cd BITMOSYS-Q423-server


3. Install Dependancies:

   ```bash
   npm install


4. Start the server:

   ```bash
   npm start



## Features
    
    Buy Crypto:
        Endpoint: POST /buy/:id
        Allows users to securely purchase cryptocurrencies using a seamless transaction process.

  -**Exchange Crypto:**
      
      Endpoint: POST /exchange/:id
        Enables users to swap one cryptocurrency for another, providing a flexible and efficient trading experience.

    Wallet Information:
        Endpoint: GET /wallet
        Retrieves comprehensive information about the user's cryptocurrency wallet, including balances and transaction history.

    Crypto Operation:
        Create a New Crypto:
            Endpoint: POST /crypto
        Get All Cryptos:
            Endpoint: GET /crypto
        Get Crypto by ID:
            Endpoint: GET /crypto/:id
        Update Crypto by ID:
            Endpoint: PUT /crypto/:id
        Delete Crypto by ID:
            Endpoint: DELETE /crypto/:id

  -**Admin Dashboard (Future Expansion):**
        API endpoints are strategically designed for an admin dashboard, allowing for future expansion and the addition of supplementary features.

  -**Middleware and Authentication:**
        Additional layers such as middleware and authentication mechanisms can be seamlessly integrated for enhanced security. These additions should be considered for production use.

   -**File Structure:**
        The backend adheres to a monolithic structure tailored for small servers. The codebase is thoughtfully organized to facilitate easy navigation and maintenance.

---



## Contributing

Contributions to Crypto Swap are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

---

## License

Crypto Swap is released under the MIT License. Feel free to use, modify, and distribute the code according to the terms of the license.
