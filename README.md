# 🧬 Generative AI for Drug Discovery (Molecular VAE)

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-ee4c2c.svg)](https://pytorch.org/)
[![RDKit](https://img.shields.io/badge/Cheminformatics-RDKit-green.svg)](https://www.rdkit.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An end-to-end Deep Learning pipeline that trains a **Variational Autoencoder (VAE)** on chemical SMILES sequences to learn molecular grammar and autonomously design valid, diverse, and drug-like chemical compounds *de novo*.

---

## 📌 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Benchmarked AI Performance](#-benchmarked-ai-performance)
- [Architecture Summary](#-architecture-summary)
- [Project Structure](#-project-structure)
- [Prerequisites & System Requirements](#-prerequisites--system-requirements)
- [Installation & Setup](#-installation--setup)
- [Workflow & Usage](#-workflow--usage)
- [Results & Visualizations](#-results--visualizations)
- [Tech Stack](#-tech-stack)
- [License](#-license)

---

## 🚀 Project Overview

Traditional drug design requires screening millions of candidates through high-throughput assays or combinatorial synthesis—a process taking years and billions of dollars. 

This project formulates molecular discovery as a probabilistic sequence generation problem. By training a **Character-Level Recurrent Neural Network (GRU) Variational Autoencoder** on the **ZINC-250k** molecular dataset:
1. Molecules encoded as SMILES strings are compressed into a continuous 64-dimensional latent bottleneck.
2. The continuous latent space regularizes chemical representations into smooth manifolds.
3. Sampling novel vectors from a standard normal prior distribution enables the decoder to synthesize brand-new, chemically valid molecules that do not exist anywhere in the training data.

---

## ✨ Key Features

- **Character-Level Molecular Tokenization:** Parses and tokenizes SMILES strings with special control tokens (`<PAD>`, `<SOS>`, `<EOS>`) preserving chemical syntax.
- **GRU-Based Variational Autoencoder:**
  - Embedding layer (128-d) + Recurrent GRU Encoder (256 hidden units).
  - 64-dimensional continuous Gaussian latent space with reparameterization trick.
  - GRU Decoder initialized from latent space with Teacher Forcing during training.
- **Balanced Loss Formulation:** Combined sequence cross-entropy reconstruction loss with $\beta$-scaled Kullback-Leibler (KL) divergence ($\beta = 0.05$) to prevent posterior collapse.
- **Controllable Inference Sampling:** Autoregressive sequence generation with temperature scaling to balance chemical novelty and sequence validity.
- **Automated Checkpointing:** Seamless training resumption from the latest epoch checkpoint (`vae_epoch_*.pt`).
- **Cheminformatics Validation via RDKit:** Automatic calculation of molecular validity, uniqueness, novelty, QED (drug-likeness), and Crippen LogP lipophilicity.
- **Latent Space Manifold Analysis:** PCA and t-SNE dimensionality reduction to visualize chemical clustering.

---

## 🏆 Benchmarked AI Performance

Evaluated on a large-scale sample of **100,000 generated molecules** sampled from prior distribution $\mathcal{N}(0, I)$:

| Metric | Score | Description |
| :--- | :--- | :--- |
| **Validity** | **81.31%** | Generated SMILES strings successfully parsed and chemically validated by RDKit. |
| **Uniqueness** | **99.95%** | Percentage of unique structures among valid samples (minimal mode collapse). |
| **Novelty** | **100.00%** | Zero generated molecules matched the ZINC training set (100% genuine AI hallucinations). |

---

## 🧠 Architecture Summary

```
Input SMILES Token IDs
        │
        ▼
[Embedding Layer] (vocab_size -> 128)
        │
        ▼
[GRU Encoder] (Hidden Dim: 256)
        │
        ├──> fc_mu  (256 -> 64) ──┐
        └──> fc_var (256 -> 64) ──┴──> Reparameterization Trick: z = mu + eps * sigma
                                                 │
                                                 ▼
[GRU Decoder] <── fc_z_to_hidden (64 -> 256) (Initial Hidden State)
        │
        ▼
[fc_out] (256 -> vocab_size) ──> Softmax / Cross-Entropy Loss
```

For complete technical and mathematical details, refer to [EXPLAINATION.md](EXPLAINATION.md).

---

## 📂 Project Structure

```
Drug-Discovery-VAE/
├── .gitignore
├── requirements.txt
├── README.md
├── EXPLAINATION.md
├── models/
│   ├── checkpoints/
│   │   ├── vae_epoch_1.pt ... vae_epoch_10.pt
│   └── vae_final.pt
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_preprocessing.ipynb
│   ├── 03_model_training.ipynb
│   ├── 04_generation_evaluation.ipynb
│   ├── 05_visualization.ipynb
│   └── 06_deep_evaluation.ipynb
└── results/
    ├── 1000_new_drugs.pdf
    ├── 1000_new_drugs_chart.pdf
    ├── all_generated_drugs.csv
    ├── all_generated_drugs_full_list.csv
    └── plots/
        ├── latent_space_visualization.png
        ├── loss_curve.png
        └── top_generated_molecules.png
```

---

## 💻 Prerequisites & System Requirements

* **Operating System:** Linux, macOS, or Windows 10/11
* **Python:** 3.9 or higher (Python 3.10+ recommended)
* **Package Manager:** `conda` (recommended for RDKit compatibility) or `pip`
* **Hardware:**
  * Minimum: 8 GB RAM, Multi-core CPU
  * Recommended: NVIDIA GPU with CUDA support for accelerated model training

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Harshil7031/Drug-Discovery-VAE.git
cd Drug-Discovery-VAE
```

### 2. Environment Setup

#### Option A: Using Conda (Recommended)
```bash
conda create -n drug-vae python=3.10 -y
conda activate drug-vae
pip install -r requirements.txt
```

#### Option B: Using Python Virtual Environment (`venv`)
```bash
python -m venv venv

# On Linux/macOS:
source venv/bin/activate

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# Install dependencies:
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Dataset Setup
Download the standard **ZINC-250k** dataset (e.g. `250k_rndm_zinc_drugs_clean_3.csv`) and place it inside:
```
data/raw/250k_rndm_zinc_drugs_clean_3.csv
```
*(Note: Raw CSVs and processed numpy arrays are excluded from Git tracking via `.gitignore` to preserve repository hygiene).*

---

## 🔄 Workflow & Usage

Launch Jupyter Notebook or JupyterLab:
```bash
jupyter lab
```

Execute the notebooks sequentially in `notebooks/`:

1. **`01_data_exploration.ipynb`**: Exploratory data analysis, parsing SMILES strings with RDKit, and property profiling.
2. **`02_preprocessing.ipynb`**: Sequence cleaning, vocabulary indexing (`<PAD>`, `<SOS>`, `<EOS>`), tokenization, and dataset splitting into `X_train.npy` and `X_test.npy`.
3. **`03_model_training.ipynb`**: Trains the `MolecularVAE` over 10 epochs using combined reconstruction + KL loss. Supports auto-resuming from checkpoints.
4. **`04_generation_evaluation.ipynb`**: Decodes random latent samples using temperature-scaled multinomial sampling and runs initial RDKit validity tests.
5. **`05_visualization.ipynb`**: Performs PCA and t-SNE dimensionality reduction on the latent manifold; plots molecular cluster spaces.
6. **`06_deep_evaluation.ipynb`**: Generates 100,000 molecules, calculates complete chemical statistics (Validity, Uniqueness, Novelty, QED, LogP), and outputs structured CSV and PDF reports.

---

## 📊 Results & Visualizations

The generated model checkpoints and analysis artifacts are stored under `models/` and `results/`:
* **Loss Curve:** `results/plots/loss_curve.png` (Convergence trajectory across epochs)
* **Latent Manifold:** `results/plots/latent_space_visualization.png` (PCA & t-SNE clusters)
* **Sampled Molecules:** `results/plots/top_generated_molecules.png` (Visual 2D chemical structures)
* **Generated Compounds Dataset:** `results/all_generated_drugs.csv` and `results/all_generated_drugs_full_list.csv`

---

## 🛠️ Tech Stack

* **Deep Learning Framework:** [PyTorch](https://pytorch.org/)
* **Cheminformatics Engine:** [RDKit](https://www.rdkit.org/)
* **Data Manipulation & Numerics:** [NumPy](https://numpy.org/), [Pandas](https://pandas.pydata.org/)
* **Machine Learning & Dimension Reduction:** [Scikit-Learn](https://scikit-learn.org/)
* **Visualizations:** [Matplotlib](https://matplotlib.org/), [Seaborn](https://seaborn.pydata.org/)
* **Environment:** [Jupyter Notebooks](https://jupyter.org/)

---

## 📝 License

This project is licensed under the MIT License for educational and research purposes.
