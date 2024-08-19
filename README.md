# AestheticAxis 🎨

<div align="center">
  <img src="https://i.ibb.co/Nr4rj6p/aesthetic-axis-logo.png" alt="AestheticAxis Logo" width="200" height="200">
</div>

AestheticAxis is an interactive quiz application that helps users discover their unique aesthetic style. By answering a series of questions, users can explore various aesthetic categories and find the one that resonates most with their personal taste.

## 🌟 Features

- Interactive quiz with slider-based questions
- Multiple aesthetic categories (e.g., goth, cottagecore, cyberpunk)
- Dynamic progress bar
- Personalized results based on user responses
- Responsive design for various devices
- User authentication and profile management
- Animated UI components for enhanced user experience
- Data visualization of quiz results

## 🛠️ Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Chakra UI](https://chakra-ui.com/) - Component library for building accessible React applications
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service platform
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Spring](https://react-spring.dev/) - Spring-physics based animation library
- [Plotly.js](https://plotly.com/javascript/) - Graphing library
- [TSParticles](https://particles.js.org/) - Particle animation library
- [React Icon Cloud](https://react-icon-cloud.vercel.app/) - Icon cloud component for React

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/boshyxd/aesthetic-axis.git
   cd aesthetic-axis
   ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
5. Open http://localhost:3000 in your browser to see the application.

## 📚 Project Structure

- `src/pages`: Contains the main pages of the application
- `src/components`: Reusable React components
- `src/hooks`: Custom React hooks
- `src/styles`: Global styles and CSS modules
- `src/firebase`: Firebase configuration and utility functions
- `src/data`: Static data used in the application

## 🧪 Testing

To run the tests, use the following command:

```bash
npm run test
# or
yarn test
```

## 🚀 Deployment

This project is set up for deployment on GitHub Pages. The deployment process is automated using GitHub Actions. When you push to the `main` branch, the workflow defined in `.github/workflows/nextjs.yml` will build and deploy the application.

## 📚 Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs/getting-started)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by various online aesthetic quizzes and style guides
- Thanks to all contributors and users of AestheticAxis
- Special thanks to the open-source community for the amazing tools and libraries used in this project

---

Made with ❤️ by [boshyxd](https://github.com/boshyxd)