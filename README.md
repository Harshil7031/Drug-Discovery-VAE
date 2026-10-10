# 🧬 Generative AI for Drug Discovery (VAE)

An end-to-end Machine Learning pipeline that uses a **Variational Autoencoder (VAE)** to learn the chemical grammar of molecules and hallucinate brand-new, valid, drug-like compounds from scratch.

## 🚀 Project Overview
Traditional drug discovery is a slow, expensive process. This project leverages Deep Learning to explore the chemical latent space. By training a Character-Level Recurrent Neural Network (RNN) VAE on the **ZINC Database** (using SMILES strings), the model learns the complex rules of chemistry and can generate completely novel molecules that do not exist in the training data.

### 🏆 AI Generation Performance
After generating a sample of 100,000 novel molecules from standard normal noise in the latent space, the model achieved the following Generative AI metrics:
*   **Validity:** 81.31% (RDKit successfully parsed the chemical structure)
*   **Uniqueness:** 99.95% (The AI does not repeat itself; almost every generated drug is different)
*   **Novelty:** 100.00% (The AI invented these; they are *not* copied from the ZINC training data)

## 📂 Project Structure
The project is divided into 6 clear, sequential Jupyter Notebooks:

1. **`01_data_exploration.ipynb`**: Loading the ZINC dataset, parsing SMILES strings with RDKit, and visualizing chemical properties.
2. **`02_preprocessing.ipynb`**: Tokenizing the chemical strings, building a character vocabulary (`<SOS>`, `<EOS>`, `<PAD>`), and tensorizing the data for PyTorch.
3. **`03_model_training.ipynb`**: Building the VAE architecture (Encoder, Latent Space Reparameterization, Decoder) and executing the training loop with KL Divergence and Reconstruction loss.
4. **`04_generation_evaluation.ipynb`**: Decoding random latent vectors into chemical sequences using probability sampling (temperature decoding).
5. **`05_visualization.ipynb`**: Dimensionality reduction (PCA and t-SNE) of the AI's "brain" (Latent Space) to visualize how it clusters molecules.
6. **`06_deep_evaluation.ipynb`**: Massive-scale generation (100k+ molecules), rigorous RDKit validity scoring, and calculating QED/logP properties for the final CSV export.

## ⚙️ Installation & Usage

To run this project locally, clone the repository and install the required dependencies:

    git clone https://github.com/Harshil7031/Drug-Discovery-VAE.git
    cd Drug-Discovery-VAE
    pip install -r requirements.txt

*(Note: Due to GitHub file size limits, the raw ZINC dataset and the preprocessed `.npy` tensor files are not included in this repository. You will need to download a ZINC SMILES dataset and run Notebook 2 to generate the training data).*

## 🛠️ Tech Stack
*   **Deep Learning:** PyTorch
*   **Cheminformatics:** RDKit
*   **Data Processing:** Pandas, NumPy
*   **Visualization:** Matplotlib, Scikit-Learn (PCA/t-SNE)

## 📝 License
This project was built for educational and research purposes.
