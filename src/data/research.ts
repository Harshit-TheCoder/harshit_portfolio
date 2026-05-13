export const researchData = [
  {
    title: "Lightweight GNN Autoencoder for Multivariate Wearable Time-Series Anomaly Detection",
    domain: "IoT & Edge AI & Graph Neural Networks",
    description: "Proposes an unsupervised anomaly detection framework using a lightweight GNN autoencoder for wearable sensor data, capturing inter-sensor structural dependencies via correlation-derived graphs.",
    abstract: "The increasing number of Internet of Things (IoT) devices, especially wearables, generates complex, multi-dimensional sensor data streams. This requires efficient and quick anomaly detection methods for applications like healthcare monitoring and predictive maintenance. Current methods either fail to consider the relationships between different sensors, or they use computationally intensive models that aren't suitable for devices with limited resources. This study proposes an unsupervised anomaly detection framework using a lightweight Graph Neural Network (GNN) autoencoder. Sensor data is represented as a graph derived from correlations, thereby capturing structural dependencies and mitigating the need for intricate temporal architectures. This study differs from previous research by focusing on how well it applies across different subjects, using strict evaluation methods that prevent data leaks. The model's training uses only normal data. It identifies anomalies by looking at the reconstruction error. Furthermore, post-training INT8 quantization improves efficiency by reducing model size and inference latency, with only a small impact on performance. This results in a compact architecture with about 3.8K parameters. Evaluations of the PAMAP2 dataset, using both between-subject and leave-one-subject-out (LOSO) methods, show strong generalization capabilities, as indicated by an ROC-AUC above 0.87. Furthermore, a scoring methodology grounded in extreme value theory (EVT) facilitates label-free assessment.",
    link: "#",
  },
  {
    title: "Cross Channel Threat Detection: Unified Classification of Phishing Emails, URLs, SMS and Web Content",
    domain: "Cybersecurity & AI & Deep Learning",
    description: "A unified framework combining four threat detection models using ML, deep learning, and ensemble methods to detect phishing emails, malicious URLs, SMS spam, and phishing websites.",
    abstract: "Cybercrime, which includes email phishing, malicious URL attacks, SMS spam and phishing websites, has seen a significant increase in both its frequency and sophistication, necessitating the development of unified and effective detection methods. Current methods often address these threats in a fragmented way, which limits their ability to be used against a wide range of attack types. This research presents a unified framework for detecting cybercrime. The system combines four different threat detection models, using recent advancements in machine learning, deep learning and ensemble methods. A model for detecting email phishing uses TF-IDF to extract text features and incorporates rule-based security indicators. A Light Gradient Boosting Machine (LightGBM) classifier attains a test accuracy of 99.46%. A large-scale phishing URL detection framework is introduced using over 3.3 million URLs, integrating classical machine learning models with deep architectures, including CNN–Transformer and CNN–BiLSTM networks, resulting in an accuracy of 97.69% and a ROC-AUC of 0.9967. Furthermore, a hybrid ensemble model for detecting SMS spam combines Long Short-Term Memory (LSTM) and CatBoost classifiers. The unified approach demonstrates strong generalisation capabilities across all four threat vectors.",
    link: "#",
  },
  {
    title: "Deep Learning-Based Weld Defect Classification: A Comparative Evaluation of Convolutional and Transformer Architectures",
    domain: "Computer Vision & Industrial AI",
    description: "A reliable automated deep learning framework using transformer-based methods, residual architectures, and CNNs to detect weld defects, evaluated on the TIG Aluminium 5083 dataset.",
    abstract: "Welding is an important process in manufacturing where defects like burn through, contamination, and insufficient penetration can weaken the structure. Traditional testing methods usually depend on manual inspection, which may take long time, and mistakes can be made. To overcome these obstacles, our work provides a reliable and automated deep learning framework using transformer based methods, residual architectures, and CNNs to detect these defects. We used the TIG Aluminium 5083 dataset to train and test the models. This work uses strict sequence based data splitting method to stop the data from leaking between consecutive frames and also to make sure that the model's performance is measured accurately. Our results show that lightweight CNN architectures, specifically MobileNetV2, gets a good balance between speed and accuracy. But transformer based models don't perform well as they need huge datasets. Our approach provides a practical solution for realtime classification of welding defects in industrial environments.",
    link: "#",
  },
  {
    title: "Financial Fraud Anomaly Detection",
    domain: "FinTech & Machine Learning",
    description: "Research on identifying anomalous transaction patterns using advanced ML models to prevent financial fraud in real-time.",
    abstract: "This research investigates advanced machine learning approaches for detecting anomalous financial transaction patterns in real-time. The study explores ensemble methods, graph-based representations of transaction networks, and temporal modeling to identify fraudulent activity with high precision and low false-positive rates. The framework is designed to operate under strict latency constraints suitable for production financial systems.",
    link: "#",
  },
];
