import React, { useState, useEffect } from 'react';

const Contador = () => {
  // Estado do contador
  const [contador, setContador] = useState(0);
  // Estado para controlar se o contador está rodando
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    let intervalo;

    // Iniciar o intervalo apenas se o contador estiver ativo
    if (ativo) {
      intervalo = setInterval(() => {
        setContador((prev) => prev + 1);
      }, 1000); // Incrementa a cada 1000ms (1 segundo)
    }

    // Limpar o intervalo quando o componente for desmontado ou quando o contador for parado
    return () => clearInterval(intervalo);
  }, [ativo]); // O efeito é reexecutado quando o valor de 'ativo' muda

  // Função para parar o contador
  const pararContador = () => {
    setAtivo(false);
  };

  // Função para iniciar o contador novamente
  const iniciarContador = () => {
    setAtivo(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Contador: {contador}</h1>
      {ativo ? (
        <button onClick={pararContador}>Parar Contador</button>
      ) : (
        <button onClick={iniciarContador}>Iniciar Contador</button>
      )}
    </div>
  );
};

export default Contador;
