<!-- O símbolo da INFOCO em vetor: um disco com três barras recortadas (a mesma
     geometria do favicon). As barras são vazadas, então o fundo aparece por
     elas. A cor vem de `fill`/`color` de quem usa. -->
<template>
    <svg viewBox="-1 -1 2 2" aria-hidden="true" focusable="false">
        <clipPath id="simbolo-recorte"><circle r="1" /></clipPath>
        <path
            clip-path="url(#simbolo-recorte)"
            fill="currentColor"
            fill-rule="evenodd"
            d="M-1-1h2v2h-2zM-1-.549H.08v.276H-1zM-.547-.076H.613v.261H-.547zM-.079.43H1v.274H-.079z"
        />
    </svg>
</template>
