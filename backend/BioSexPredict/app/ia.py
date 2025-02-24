import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import LogisticRegression
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split

dataset_path = 'app/dataset/seios_selected.xlsx'

# dataset_path = 'app\dataset\seios_selected.xlsx'
seios = pd.read_excel(dataset_path, sheet_name=0)

def normalization(dataset):
    dataset = dataset.abs()
    scaler = MinMaxScaler()
    
    # Separando a primeira coluna
    first_column = dataset.iloc[:, 0]  
    features = dataset.iloc[:, 1:]  # Todas as colunas, exceto a primeira

    # Normalizando apenas as colunas selecionadas
    normalized_features = pd.DataFrame(scaler.fit_transform(features), columns=features.columns)

    # Juntando a primeira coluna com os dados normalizados
    normalized_dataset = pd.concat([first_column, normalized_features], axis=1)

    # Salvando o scaler treinado
    joblib.dump(scaler, 'app\scaler_treinado.pkl')

    return normalized_dataset

def normalization_array(f_sa, f_lr, md_si, f_sr, f_si, f_sl, e_ap):
    scaler = joblib.load('app\scaler_treinado.pkl')
    data = {
        'F - S-A (tridimensional)' : [f_sa],
        'F - L-R (tridimensional)' : [f_lr],
        'MD - S-I (tridimensional)' : [md_si],
        'F - S-R (tridimensional)' : [f_sr],
        'F - S-I (tridimensional)' : [f_si],
        'F - S-L (3D)' : [f_sl],
        'E - A-P (tridimensional)' : [e_ap]
        
    }
    
    df = pd.DataFrame(data)
    normalized_df = scaler.transform(df)
    df_normalized =  pd.DataFrame(normalized_df, columns=df.columns)
      
    return df_normalized

seios = normalization(seios)

class_0 = seios[seios['Sexo'] == 0]
class_1 = seios[seios['Sexo'] == 1]

# Encontrando o tamanho mínimo entre as classes
min_size = min(len(class_0), len(class_1))

# Ajustando as classes para o mesmo tamanho
class_0 = class_0.sample(n=min_size, random_state=42)
class_1 = class_1.sample(n=min_size, random_state=42)

# Concatenando as classes balanceadas
balanced_df = pd.concat([class_0, class_1])

# Dividindo em conjuntos de treino e teste de forma estratificada
train_df, test_df = train_test_split(balanced_df, test_size=0.2, random_state=42, stratify=balanced_df['Sexo'])


#Conjunto de treino tridimensional
palavras_chave = ['Volume', 'linear']
colunas_para_remover = [col for col in train_df.columns if any(palavra in col for palavra in palavras_chave)]
train_df_tridimensional = train_df.drop(colunas_para_remover, axis=1)
sexo_coluna_train = train_df_tridimensional.iloc[:, 0]
y_sexo_train_tridimensional = sexo_coluna_train
metrics = train_df_tridimensional.drop(train_df_tridimensional.columns[0], axis=1)
X_sexo_train_tridimensional = metrics

#Conjunto de teste tridimensional
palavras_chave = ['Volume', 'linear']
colunas_para_remover = [col for col in test_df.columns if any(palavra in col for palavra in palavras_chave)]
test_df_tridimensional = test_df.drop(colunas_para_remover, axis=1)
sexo_coluna_test = test_df_tridimensional.iloc[:, 0]
y_sexo_test_tridimensional = sexo_coluna_test
metrics = test_df_tridimensional.drop(test_df_tridimensional.columns[0], axis=1)
X_sexo_test_tridimensional = metrics

#Logistic Regression
model = LogisticRegression(random_state = 2, C=10, max_iter=200, penalty='l1', solver='saga')
model.fit(X_sexo_train_tridimensional, y_sexo_train_tridimensional)


def predict(f_sa, f_lr, md_si, f_sr, f_si, f_sl, e_ap):
    values = normalization_array(f_sa, f_lr, md_si, f_sr, f_si, f_sl, e_ap)
    result = model.predict(values)
    
    if result == 0:
        return 'Mulher'
    else:
        return 'Homem'

# #Woman
# values_test_woman = predict(15.077, 39.156, 33.123, 23.799, 29.084, 22.11, 25.508)
# #Man
# values_test_man = predict(41.875, 68.363, 39.405,  57.893, 50.029, 30.105, 40.508)

# print("previsão teste 1:", values_test_woman)
# print("previsão teste 2:", values_test_man)