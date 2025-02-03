import pandas as pd
import os
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.feature_selection import SelectFromModel

file_path_measures = "app/IA/Datasets/Diego Santiago tese - IA.xlsx"
sheets = pd.read_excel(file_path_measures, sheet_name=None)

# Caminho da pasta de destino
output_folder = "app/IA/Datasets"

# Ler o arquivo Excel
excel_data = pd.ExcelFile(file_path_measures)

# Loop através das abas e salvar cada uma como um arquivo separado
for sheet_name in excel_data.sheet_names:
    # Ler os dados da aba
    data = excel_data.parse(sheet_name)
    
    # Caminho do arquivo de saída
    output_file = os.path.join(output_folder, f"{sheet_name}.xlsx")
    
    # Salvar a aba como um arquivo Excel separado
    data.to_excel(output_file, index=False)


#Divisão de tabelas
sheets_seio_frontal = sheets['SEIO FRONTAL']
sheets_seio_maxilar_direito = sheets['SEIO MAXILAR DIREITO']
sheets_seio_maxilar_esquerdo = sheets['SEIO MAXILAR ESQUERDO']
sheets_seio_esfenoide = sheets['SEIO ESFENÓIDE']
legends_table = sheets['LEGENDA']

#Remoção da duplicação da coluna sexo nas demais colunas
seio_maxilar_direito = sheets_seio_maxilar_direito.drop(columns=sheets_seio_maxilar_direito.columns[:3])
seio_maxilar_esquerdo = sheets_seio_maxilar_esquerdo.drop(columns=sheets_seio_maxilar_esquerdo.columns[:3])
seio_esfenoide = sheets_seio_esfenoide.drop(columns=sheets_seio_esfenoide.columns[:2])

#Concatenação das tabelas
seios = pd.concat([sheets_seio_frontal, seio_maxilar_direito, seio_maxilar_esquerdo, seio_esfenoide], axis=1)
pd.set_option('display.max_columns', None)

#Remoção da colunua N (número de indivíduos)
seios = seios.drop('N', axis=1)

#Remoção da coluna idade
seios = seios.drop('Idade', axis=1)

#Tokenização das classes (Masculino:0, Feminino:1)
seios['Sexo'] = seios['Sexo'].replace({'M': 0, 'F': 1})

#Trocando valores de números negativos para positivos
seios = seios.abs()


seios['Sexo'] = seios['Sexo'].replace({'M': 0, 'F': 1})

seios = seios.abs()

df = pd.DataFrame(seios)

cols_to_normalize = df.columns[1:]

scaler = MinMaxScaler()

seios[cols_to_normalize] = scaler.fit_transform(seios[cols_to_normalize])

seios['Sexo'] = seios['Sexo'].astype(int)


# Separando as classes
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


# Garantindo que as classes no treino e teste estão balanceadas
print(f'Classe 0 no treino: {train_df[train_df["Sexo"] == 0].shape[0]}')
print(f'Classe 1 no treino: {train_df[train_df["Sexo"] == 1].shape[0]}')
print(f'Classe 0 no teste: {test_df[test_df["Sexo"] == 0].shape[0]}')
print(f'Classe 1 no teste: {test_df[test_df["Sexo"] == 1].shape[0]}')


#Conjunto de treino linear
palavras_chave = ['Volume', '3D', 'tridimensional']
colunas_para_remover = [col for col in train_df.columns if any(palavra in col for palavra in palavras_chave)]
train_df_linear = train_df.drop(colunas_para_remover, axis=1)
sexo_coluna_train = train_df_linear.iloc[:, 0]
y_sexo_train_linear = sexo_coluna_train
metrics = train_df_linear.drop(train_df_linear.columns[0], axis=1)
X_sexo_train_linear = metrics

#Conjunto de treino tridimensional
palavras_chave = ['Volume', 'linear']
colunas_para_remover = [col for col in train_df.columns if any(palavra in col for palavra in palavras_chave)]
train_df_tridimensional = train_df.drop(colunas_para_remover, axis=1)
sexo_coluna_train = train_df_tridimensional.iloc[:, 0]
y_sexo_train_tridimensional = sexo_coluna_train
metrics = train_df_tridimensional.drop(train_df_tridimensional.columns[0], axis=1)
X_sexo_train_tridimensional = metrics

#Conjunto de treino volume
palavras_chave = ['linear', '3D', 'tridimensional']
colunas_para_remover = [col for col in train_df.columns if any(palavra in col for palavra in palavras_chave)]
train_df_volume = train_df.drop(colunas_para_remover, axis=1)
sexo_coluna_train = train_df_volume.iloc[:, 0]
y_sexo_train_volume = sexo_coluna_train
metrics = train_df_volume.drop(train_df_volume.columns[0], axis=1)
X_sexo_train_volume = metrics


#Conjunto de teste linear
palavras_chave = ['Volume', '3D', 'tridimensional']
colunas_para_remover = [col for col in test_df.columns if any(palavra in col for palavra in palavras_chave)]
test_df_linear = test_df.drop(colunas_para_remover, axis=1)
sexo_coluna_test = test_df_linear.iloc[:, 0]
y_sexo_test_linear = sexo_coluna_test
metrics = test_df_linear.drop(test_df_linear.columns[0], axis=1)
X_sexo_test_linear = metrics

#Conjunto de teste tridimensional
palavras_chave = ['Volume', 'linear']
colunas_para_remover = [col for col in test_df.columns if any(palavra in col for palavra in palavras_chave)]
test_df_tridimensional = test_df.drop(colunas_para_remover, axis=1)
sexo_coluna_test = test_df_tridimensional.iloc[:, 0]
y_sexo_test_tridimensional = sexo_coluna_test
metrics = test_df_tridimensional.drop(test_df_tridimensional.columns[0], axis=1)
X_sexo_test_tridimensional = metrics

#Conjunto de teste volume
palavras_chave = ['linear', '3D', 'tridimensional']
colunas_para_remover = [col for col in test_df.columns if any(palavra in col for palavra in palavras_chave)]
test_df_volume = test_df.drop(colunas_para_remover, axis=1)
sexo_coluna_test = test_df_volume.iloc[:, 0]
y_sexo_test_volume = sexo_coluna_test
metrics = test_df_volume.drop(test_df_volume.columns[0], axis=1)
X_sexo_test_volume = metrics

logistic_sexo_tridimensional = LogisticRegression(random_state = 2, C=100, max_iter=200, penalty='l1', solver='liblinear')
logistic_sexo_tridimensional.fit(X_sexo_train_tridimensional, y_sexo_train_tridimensional)


# Feature Selection com base nos coeficientes
selector = SelectFromModel(logistic_sexo_tridimensional, prefit=True)
selected_features_mask = selector.get_support()

# Obter as features selecionadas e seus coeficientes
selected_features = np.array(X_sexo_train_tridimensional.columns)[selected_features_mask]
selected_coefficients = np.abs(logistic_sexo_tridimensional.coef_[0][selected_features_mask])

# Criar um DataFrame para o ranking
feature_ranking = pd.DataFrame({
    'Feature': selected_features,
    'Coefficient': selected_coefficients
}).sort_values(by='Coefficient', ascending=False)

# Obter as 7 melhores features
top_features = feature_ranking.head(7)['Feature'].values
print(top_features)

print(top_features)

X_sexo_train_tridimensional_selected = X_sexo_train_tridimensional[top_features]
X_sexo_test_tridimensional_selected = X_sexo_test_tridimensional[top_features]

logistic_sexo_tridimensional_selected = LogisticRegression(random_state = 2, C=10, max_iter=200, penalty='l1', solver='saga')
logistic_sexo_tridimensional_selected.fit(X_sexo_train_tridimensional_selected, y_sexo_train_tridimensional)



predicao1 = logistic_sexo_tridimensional_selected.predict([[41.875, 68.363, 39.405,  57.893 , 50.029 , 30.105 , 40.508 ]])
print(predicao1)
if predicao1[0] == 0:
    print("Homem")
else:
    print("Mulher")
    


'MISTRESSEI!!!'
'ESSA BOMBA DE INTERNET!!!!!!!!!'




predicao2 = logistic_sexo_tridimensional_selected.predict([[15.077, 39.156, 33.123,  23.799 , 29.084 , 22.11  ,  25.508  ]])
print(predicao2)
if predicao2[0] == 0:
    print("Homem")
else:
    print("Mulher")