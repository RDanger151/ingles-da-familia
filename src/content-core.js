/* ============================================================
   CONTEÚDO FIXO DO CURSO (separado do motor)
   Para acrescentar semanas: crie um bloco COURSE.weeks[N] = {...}
   no mesmo formato de content-w01-04.js. O motor não muda.
   ============================================================ */
window.COURSE = {
weeks: {},

/* Plano de 24 semanas: [título da trilha natural, ponto da trilha gramática, o que a pessoa passa a conseguir] */
plan: [
["Primeiros contatos","Verbo to be: am, is, are","cumprimentar, se apresentar e pedir para repetir"],
["Família, trabalho e rotina","Presente simples e perguntas com do/does","falar da família, do trabalho e do seu dia"],
["Comida e compras","There is, have, can, posse","pedir comida e bebida, perguntar preços e comprar"],
["Pela cidade","Present continuous, in/on/at, want to","pedir informações na rua, pegar transporte e combinar um encontro"],
["Em casa e na vizinhança","Passado do to be: was, were","descrever sua casa e dizer como as coisas eram"],
["O que aconteceu ontem","Passado simples: verbos regulares","contar o que você fez ontem"],
["O fim de semana","Passado simples: verbos irregulares","contar o fim de semana com os verbos mais comuns"],
["Saúde: médico e farmácia","Perguntas e negativas com did","explicar o que está sentindo e entender instruções simples"],
["Telefone e mensagens","Futuro com going to","marcar, confirmar e cancelar compromissos"],
["No trabalho","Will: decisões e promessas","falar de tarefas, oferecer ajuda e combinar prazos"],
["Viagem: aeroporto e hotel","Can, could, would: pedidos educados","fazer check-in, pedir coisas e resolver problemas simples"],
["Restaurante e convites","Should, have to, must","convidar, aceitar, recusar e dar conselhos"],
["Contar uma história","Passado contínuo: was doing","contar uma história com começo, meio e fim"],
["Opiniões","Comparativos e superlativos","dar opinião, concordar e discordar com educação"],
["Planos e sonhos","Present perfect: experiências","falar do que já fez na vida e do que quer fazer"],
["Problemas e reclamações","Present perfect ou passado simples","reclamar com educação e pedir solução"],
["Novidades","For, since, already, yet","contar novidades e perguntar pelas dos outros"],
["E se…?","Primeira condicional","falar de possibilidades reais e combinar alternativas"],
["Imaginando","Segunda condicional","falar de situações imaginárias"],
["Fala real","Verbos frasais mais comuns","entender a fala rápida com ligações: gonna, wanna, gotta"],
["Sua vida em inglês","Revisão dos tempos verbais","falar por alguns minutos sobre sua vida"],
["Conversas longas","Perguntas indiretas e educadas","manter uma conversa de dez minutos"],
["Mais rápido","Conectores: so, because, although","dizer com rapidez o que você já sabe"],
["Reta final","Revisão geral","conversar sobre o cotidiano com confiança e seguir sozinho"]
],
phases: [[1,4,"Sons do inglês, sobrevivência e apresentações"],[5,12,"Dia a dia, presente e passado, primeiras conversas completas"],[13,20,"Histórias, opiniões, planos e hipóteses, fala real"],[21,24,"Consolidação, fluência e conversas longas"]],

/* Teste de nivelamento. t = nível (1 a 4). tipo l = ouvir, r = ler, g = lacuna. A primeira opção é a correta. */
placement: [
{t:1,k:"l",en:"Good morning! How are you?",q:"O que você ouviu?",o:["Bom dia! Como vai?","Boa noite! Quem é você?","Bom dia! Onde você está?"]},
{t:1,k:"l",en:"What's your name?",q:"O que a pessoa quer saber?",o:["Seu nome","Sua idade","Onde você mora"]},
{t:1,k:"r",en:"I'm from Brazil.",q:"O que quer dizer?",o:["Eu sou do Brasil.","Eu vou para o Brasil.","Eu gosto do Brasil."]},
{t:1,k:"g",en:"She ___ my sister.",q:"Qual palavra completa a frase?",o:["is","am","are"]},
{t:2,k:"l",en:"Where do you work?",q:"O que a pessoa quer saber?",o:["Onde você trabalha","Quando você trabalha","Se você gosta do trabalho"]},
{t:2,k:"l",en:"How much is this jacket?",q:"O que a pessoa quer saber?",o:["O preço da jaqueta","O tamanho da jaqueta","A cor da jaqueta"]},
{t:2,k:"g",en:"He ___ in a bank.",q:"Qual palavra completa a frase?",o:["works","work","working"]},
{t:2,k:"g",en:"I ___ like coffee.",q:"Como dizer “eu não gosto de café”?",o:["don't","not","am not"]},
{t:3,k:"l",en:"I went to the supermarket yesterday, but it was closed.",q:"O que aconteceu?",o:["A pessoa foi ao supermercado ontem e estava fechado.","A pessoa vai ao supermercado amanhã.","A pessoa trabalha em um supermercado."]},
{t:3,k:"g",en:"We ___ a movie last night.",q:"Qual palavra completa a frase?",o:["watched","watch","are watching"]},
{t:3,k:"l",en:"Excuse me, can you tell me where the train station is?",q:"O que a pessoa quer?",o:["Saber onde fica a estação de trem","Saber a que horas o trem sai","Comprar uma passagem de trem"]},
{t:3,k:"g",en:"There ___ two cars in front of the house.",q:"Qual palavra completa a frase?",o:["are","is","have"]},
{t:4,k:"l",en:"I've lived here for ten years, but I'm thinking about moving next year.",q:"O que é verdade?",o:["A pessoa mora lá há dez anos e pensa em se mudar.","A pessoa se mudou há dez anos para outra cidade.","A pessoa vai morar lá por dez anos."]},
{t:4,k:"g",en:"If I ___ time tomorrow, I'll call you.",q:"Qual palavra completa a frase?",o:["have","will have","had"]},
{t:4,k:"l",en:"You should have told me earlier.",q:"O que quer dizer?",o:["Você devia ter me contado antes.","Você deve me contar depois.","Você me contou cedo."]},
{t:4,k:"g",en:"She has ___ finished the report.",q:"Como dizer “ela já terminou o relatório”?",o:["already","yet","still"]}
],

/* Sons difíceis. type pair = pares mínimos; type cat = classificar o som. */
sounds: [
{id:"th1",name:"TH de “think”",ipa:"/θ/ contra /s/ e /t/",
 how:"Ponha a ponta da língua entre os dentes, de leve, e sopre. Não é “s”, não é “f” e não é “t”. A língua aparece um pouquinho.",
 approx:"think soa perto de “tfink” com a língua entre os dentes, nunca “sink” nem “tink”.",
 type:"pair",pairs:[["think","sink"],["thank","tank"],["three","tree"],["thin","tin"],["thick","sick"],["mouth","mouse"],["path","pass"],["thought","taught"]]},
{id:"th2",name:"TH de “this”",ipa:"/ð/ contra /d/",
 how:"Mesma posição: ponta da língua entre os dentes. Agora ligue a voz, como um zumbido. Não é “d”.",
 approx:"this soa perto de “dis”, mas com a língua entre os dentes vibrando.",
 type:"pair",pairs:[["they","day"],["then","den"],["those","doze"],["there","dare"],["than","Dan"],["breathe","breeze"]]},
{id:"hr",name:"H e R no começo",ipa:"/h/ contra /r/",
 how:"O H inglês é o nosso “r” de “rato”: só um sopro. O R inglês é outro som: a língua se enrola para trás sem tocar em nada, como o “r” caipira de “porta”.",
 approx:"hat soa “rét”. red soa “uréd”, com biquinho. Se você disser red com o nosso “r”, o americano ouve head.",
 type:"pair",pairs:[["hat","rat"],["head","red"],["hide","ride"],["home","Rome"],["hope","rope"],["hate","rate"],["hole","role"],["hug","rug"]]},
{id:"iee",name:"Vogais curtas e longas",ipa:"/ɪ/ contra /iː/ e /ʊ/ contra /uː/",
 how:"O som longo (sheep) é o nosso “i”, esticado e sorrindo. O curto (ship) é rápido e relaxado, entre “i” e “ê”. O mesmo vale para fool (longo, com biquinho) e full (curto e relaxado).",
 approx:"sheep = “xiip”. ship = “xêp” bem curto. fool = “fuul”. full = “fôl” bem curto.",
 type:"pair",pairs:[["ship","sheep"],["it","eat"],["live","leave"],["sit","seat"],["fill","feel"],["chip","cheap"],["hit","heat"],["full","fool"],["pull","pool"]]},
{id:"ae",name:"A aberto de “bad”",ipa:"/æ/ contra /ɛ/",
 how:"Para bad, abra bem a boca, como quem vai dizer “a”, mas diga “é”. Para bed, a boca abre menos: é o nosso “é” normal.",
 approx:"bad = “béa-d” com a boca bem aberta. bed = “béd”.",
 type:"pair",pairs:[["bad","bed"],["man","men"],["sad","said"],["pan","pen"],["bag","beg"],["had","head"],["sat","set"],["land","lend"]]},
{id:"mnl",name:"M, N e L no fim",ipa:"/m/ /n/ /l/ finais",
 how:"Em português, “m” e “n” no fim só deixam a vogal nasal, e o “l” vira “u”. Em inglês você fecha de verdade: lábios juntos no M, língua no céu da boca atrás dos dentes no N e no L.",
 approx:"some termina com os lábios fechados. sun termina com a língua em cima. goal não é “gou”: a língua sobe no fim.",
 type:"pair",pairs:[["some","sun"],["them","then"],["came","cane"],["gum","gun"],["team","teen"],["goal","go"],["bowl","bow"],["tool","two"],["feel","fee"],["mile","my"]]},
{id:"ed",name:"As três pronúncias do -ED",ipa:"/t/ /d/ /ɪd/",
 how:"O -ed quase nunca é uma sílaba a mais. Depois de som sem voz (k, p, s, sh, ch, f) soa T: worked = “uôrkt”. Depois de som com voz soa D: played = “plêid”. Só depois de T ou D ele vira uma sílaba: wanted = “uón-tid”.",
 approx:"worked tem uma sílaba só. Nunca “uôr-ked”.",
 type:"cat",q:"Como termina?",cats:{"T (worked)":["worked","watched","stopped","liked","helped","asked","cooked","washed"],"D (played)":["played","called","lived","opened","cleaned","loved","stayed","used"],"ID (wanted)":["wanted","needed","started","waited","decided","visited","invited","ended"]}},
{id:"s",name:"O -S do fim",ipa:"/s/ /z/ finais",
 how:"O S final muda o sentido: é plural (books) ou é “ele/ela” (she works). Brasileiros costumam engolir esse som. Diga com clareza, sem colocar vogal depois.",
 approx:"books = “buks”. works = “uôrks”. Sem “i” no fim.",
 type:"pair",pairs:[["book","books"],["car","cars"],["friend","friends"],["work","works"],["like","likes"],["want","wants"],["day","days"],["need","needs"]]},
{id:"fi",name:"Sem “i” no fim",ipa:"consoante final sem vogal",
 how:"Em português quase toda palavra termina em vogal, então a gente põe um “i” sem perceber: “buki”, “uôrki”. Em inglês a palavra termina seca, na consoante. Corte o som de repente.",
 approx:"luck termina no “k”. lucky é outra palavra (sortudo). Aqui você treina o ouvido para notar a diferença.",
 type:"pair",pairs:[["luck","lucky"],["sleep","sleepy"],["rain","rainy"],["fun","funny"],["salt","salty"],["mess","messy"],["wind","windy"],["dirt","dirty"],["hand","handy"],["part","party"]]}
],

/* Ritmo e melodia. Cada item do quiz: [texto falado, pergunta, correta, errada, errada?] */
rhythm: [
{id:"stress",title:"Sílaba forte",
 text:"Toda palavra inglesa tem uma sílaba forte, dita mais alta e mais longa. As outras ficam fracas e rápidas. Errar a sílaba forte atrapalha mais do que errar um som.",
 items:[["hotel","ho-TEL"],["computer","com-PU-ter"],["breakfast","BREAK-fast"],["tomorrow","to-MOR-row"],["important","im-POR-tant"],["vegetable","VEJ-ta-ble (três sílabas)"],["comfortable","COMF-ter-ble (três sílabas)"],["interesting","IN-tres-ting (três sílabas)"]],
 quiz:[["hotel","Qual é a sílaba forte?","ho-TEL","HO-tel"],["computer","Qual é a sílaba forte?","com-PU-ter","COM-pu-ter","com-pu-TER"],["breakfast","Qual é a sílaba forte?","BREAK-fast","break-FAST"],["tomorrow","Qual é a sílaba forte?","to-MOR-row","TO-mor-row","to-mor-ROW"],["important","Qual é a sílaba forte?","im-POR-tant","IM-por-tant","im-por-TANT"],["understand","Qual é a sílaba forte?","un-der-STAND","UN-der-stand","un-DER-stand"],["family","Qual é a sílaba forte?","FAM-i-ly","fam-I-ly","fam-i-LY"],["because","Qual é a sílaba forte?","be-CAUSE","BE-cause"]]},
{id:"weak",title:"Palavras fracas",
 text:"Na frase, as palavras de conteúdo (nomes, verbos, adjetivos) são fortes. As pequenas (to, and, of, for, can, a) quase somem. É por isso que o inglês falado parece rápido. “Can” fraco soa “kn”; “can't” é forte e claro.",
 items:[["I want to go.","to soa “tâ”"],["A cup of coffee.","of soa “â”"],["Bread and butter.","and soa “n”"],["I can help you.","can soa “kn”"],["I can't help you.","can't é forte: “ként”"],["This is for you.","for soa “fâr”"]],
 quiz:[["I can help you.","A pessoa pode ajudar?","Pode (can)","Não pode (can't)"],["I can't help you.","A pessoa pode ajudar?","Não pode (can't)","Pode (can)"],["She can swim.","Ela sabe nadar?","Sabe (can)","Não sabe (can't)"],["He can't come today.","Ele vem hoje?","Não pode vir (can't)","Pode vir (can)"],["We can't see it.","Eles conseguem ver?","Não (can't)","Sim (can)"],["You can sit here.","Pode sentar?","Pode (can)","Não pode (can't)"]]},
{id:"inton",title:"Melodia das perguntas",
 text:"Pergunta de sim ou não sobe no fim: Are you okay? ↗ Pergunta com what, where, when, how desce no fim: Where do you live? ↘ Se você subir em tudo, parece inseguro; se descer numa pergunta de sim ou não, parece uma afirmação.",
 items:[["Are you okay?","sobe ↗"],["Do you like coffee?","sobe ↗"],["Where do you live?","desce ↘"],["What time is it?","desce ↘"],["Is this your bag?","sobe ↗"],["How much is it?","desce ↘"]],
 quiz:[["Are you ready?","A voz sobe ou desce no fim?","Sobe ↗","Desce ↘"],["Where are you from?","A voz sobe ou desce no fim?","Desce ↘","Sobe ↗"],["Do you work here?","A voz sobe ou desce no fim?","Sobe ↗","Desce ↘"],["What do you do?","A voz sobe ou desce no fim?","Desce ↘","Sobe ↗"],["Can I help you?","A voz sobe ou desce no fim?","Sobe ↗","Desce ↘"],["How old is he?","A voz sobe ou desce no fim?","Desce ↘","Sobe ↗"]]},
{id:"link",title:"Ligações da fala real",
 text:"Na fala rápida, palavras se juntam. Você não precisa falar assim, mas precisa entender. Estas são as mais comuns.",
 items:[["I wanna go home.","wanna = want to"],["I'm gonna call you.","gonna = going to"],["I gotta go.","gotta = have got to (tenho que)"],["Whaddaya want?","whaddaya = what do you"],["Lemme see.","lemme = let me"],["Gimme a second.","gimme = give me"],["I dunno.","dunno = don't know"],["It's kinda cold.","kinda = kind of (meio)"]],
 quiz:[["I wanna go home.","Qual é a frase completa?","I want to go home.","I won't go home.","I went to go home."],["I'm gonna call you.","Qual é a frase completa?","I'm going to call you.","I'm gone to call you.","I'm not calling you."],["I gotta go.","O que quer dizer?","Tenho que ir.","Eu fui.","Eu não vou."],["Whaddaya want?","Qual é a frase completa?","What do you want?","What did he want?","Why do you want?"],["Lemme see.","Qual é a frase completa?","Let me see.","Let's see me.","Leave me, see."],["I dunno.","Qual é a frase completa?","I don't know.","I do know.","I don't go."],["It's kinda cold.","O que quer dizer?","Está meio frio.","Está muito frio.","Não está frio."]]}
],

/* Frases de sobrevivência */
survival: [
"Sorry, I don't understand.|Desculpa, eu não entendo.",
"Can you repeat that, please?|Pode repetir, por favor?",
"Can you speak more slowly, please?|Pode falar mais devagar, por favor?",
"Sorry, what was that?|Desculpa, o que você disse?",
"What does that mean?|O que isso quer dizer?",
"What do you mean?|O que você quer dizer?",
"How do you say this in English?|Como se diz isso em inglês?",
"Can you write that down for me?|Pode escrever isso pra mim?",
"Just a second, please.|Só um segundo, por favor.",
"Let me think.|Deixa eu pensar.",
"How can I say this?|Como eu posso dizer isso?",
"I'm learning English.|Estou aprendendo inglês.",
"Sorry, my English is not very good.|Desculpa, meu inglês não é muito bom.",
"Did you say Tuesday or Thursday?|Você disse terça ou quinta?",
"Okay, got it.|Certo, entendi."
],

/* Simulador de conversas. Nó: ["fala em inglês|tradução", ["resposta|tradução|palavras-chave|próximo nó", ...]] */
scenarios: [
{id:"rest",title:"No restaurante",intro:"Você entra no Rosie's, a lanchonete do bairro. O garçom é o Luke, simpático e esquecido.",start:"a",nodes:{
a:["Hi, welcome to Rosie's! Table for one?|Oi, bem-vindo ao Rosie's! Mesa para um?",["Yes, please.|Sim, por favor.|yes|b","No, for two, please.|Não, para dois, por favor.|two|b"]],
b:["Here's the menu. Can I get you something to drink?|Aqui está o cardápio. Quer algo para beber?",["Water, please.|Água, por favor.|water|c","Can I have a coffee?|Pode me ver um café?|coffee|c","I'd like an orange juice.|Eu queria um suco de laranja.|juice|c"]],
c:["Sure. Are you ready to order?|Claro. Já quer pedir?",["Yes. I'd like the chicken sandwich.|Sim. Eu queria o sanduíche de frango.|chicken,sandwich|d","Not yet. What do you recommend?|Ainda não. O que você recomenda?|recommend,not yet|c2"]],
c2:["The cheeseburger is really good. And the soup is great today.|O cheeseburger é muito bom. E a sopa está ótima hoje.",["I'll have the cheeseburger.|Vou querer o cheeseburger.|cheeseburger,burger|d","The soup, please.|A sopa, por favor.|soup|d"]],
d:["Great choice. Anything else?|Ótima escolha. Mais alguma coisa?",["No, thanks. That's all.|Não, obrigado. É só isso.|all,no|e","Can I have some fries, too?|Pode trazer batata frita também?|fries|e"]],
e:["Here you go. Oh no, I'm sorry! I forgot your drink. One second!|Aqui está. Ah, não, desculpa! Esqueci sua bebida. Um segundo!",["No problem.|Sem problema.|problem|f","That's okay. Thank you.|Tudo bem. Obrigado.|okay,thank|f"]],
f:["Here's your drink. How is everything?|Aqui está sua bebida. Como está tudo?",["It's really good, thank you.|Está muito bom, obrigado.|good|g","Excuse me, this is cold.|Com licença, isto está frio.|cold|f2"]],
f2:["Oh, I'm so sorry! I'll get you a new one right away.|Ai, mil desculpas! Já trago outro.",["Thank you.|Obrigado.|thank|g","No problem. Thanks.|Sem problema. Valeu.|problem|g"]],
g:["Can I get you anything else? Dessert?|Quer mais alguma coisa? Sobremesa?",["No, thanks. Can I have the check, please?|Não, obrigado. Pode trazer a conta, por favor?|check|h","What do you have for dessert?|O que tem de sobremesa?|what,dessert|g2"]],
g2:["We have apple pie and ice cream.|Temos torta de maçã e sorvete.",["I'll have the apple pie.|Vou querer a torta de maçã.|pie,apple|h0","Just the check, please.|Só a conta, por favor.|check|h"]],
h0:["Good choice. Here you go. And here's your check.|Boa escolha. Aqui está. E aqui está a conta.",["Thank you.|Obrigado.|thank|h"]],
h:["Sure. Cash or card?|Claro. Dinheiro ou cartão?",["Card, please.|Cartão, por favor.|card|i","Cash.|Dinheiro.|cash|i"]],
i:["Thank you! Have a great day!|Obrigado! Tenha um ótimo dia!",["Thanks. You too!|Obrigado. Você também!|you too,thanks|end"]]}},
{id:"air",title:"No aeroporto",intro:"Você está no balcão da companhia aérea para despachar a mala.",start:"a",nodes:{
a:["Good morning. Where are you flying today?|Bom dia. Para onde você vai hoje?",["I'm flying to Chicago.|Vou para Chicago.|chicago|b","To New York.|Para Nova York.|new york|b"]],
b:["Can I see your passport, please?|Posso ver seu passaporte, por favor?",["Sure. Here you go.|Claro. Aqui está.|sure,here|c","Yes, here it is.|Sim, aqui está.|yes,here|c"]],
c:["Thank you. Are you checking any bags?|Obrigado. Vai despachar alguma mala?",["Yes, one bag.|Sim, uma mala.|one,yes|d","No, just a carry-on.|Não, só bagagem de mão.|carry,no|e"]],
d:["Please put it on the scale. Okay, it's fine. Did you pack your bag yourself?|Coloque na balança, por favor. Certo, está ok. Foi você mesmo que fez a mala?",["Yes, I did.|Sim, fui eu.|yes|e"]],
e:["Would you like a window seat or an aisle seat?|Prefere janela ou corredor?",["A window seat, please.|Janela, por favor.|window|f","An aisle seat, please.|Corredor, por favor.|aisle|f"]],
f:["Here's your boarding pass. Your gate is B12. Boarding starts at ten thirty.|Aqui está seu cartão de embarque. Seu portão é o B12. O embarque começa às dez e meia.",["Thank you. Where is the gate?|Obrigado. Onde fica o portão?|where,gate|g","Sorry, can you repeat that, please?|Desculpa, pode repetir, por favor?|repeat,sorry|f2"]],
f2:["Of course. Gate B12. Boarding at ten thirty.|Claro. Portão B12. Embarque às dez e meia.",["Thank you. Where is the gate?|Obrigado. Onde fica o portão?|where|g","Got it. Thanks!|Entendi. Obrigado!|got,thanks|h"]],
g:["Go straight and turn left after security.|Siga em frente e vire à esquerda depois da segurança.",["Thank you very much.|Muito obrigado.|thank|h"]],
h:["You're welcome. Have a nice flight!|De nada. Bom voo!",["Thanks! Bye.|Obrigado! Tchau.|thanks,bye|end"]]}},
{id:"job",title:"Entrevista de emprego",intro:"Uma entrevista simples para um trabalho de atendimento.",start:"a",nodes:{
a:["Hi, thanks for coming in. Please, have a seat. How are you today?|Oi, obrigada por vir. Sente-se, por favor. Como você está hoje?",["I'm good, thank you. And you?|Estou bem, obrigado. E você?|good,fine|b","A little nervous, but I'm fine.|Um pouco nervoso, mas estou bem.|nervous|b"]],
b:["I'm great. So, tell me a little about yourself.|Estou ótima. Então, me fale um pouco sobre você.",["I'm from Brazil, and I live here now.|Sou do Brasil e moro aqui agora.|brazil|c","I'm a hard worker, and I like to learn.|Sou trabalhador e gosto de aprender.|worker,learn|c"]],
c:["Nice. What do you do right now?|Legal. O que você faz no momento?",["I work in an office.|Trabalho em um escritório.|office|d","I work at a store.|Trabalho em uma loja.|store|d","I'm looking for a job.|Estou procurando emprego.|looking|d"]],
d:["Do you have experience with customers?|Você tem experiência com clientes?",["Yes, I do. I like working with people.|Tenho, sim. Gosto de trabalhar com gente.|yes,people|e","Not much, but I learn fast.|Não muita, mas aprendo rápido.|not much,fast|e"]],
e:["Good. Can you work on weekends?|Bom. Você pode trabalhar nos fins de semana?",["Yes, I can.|Posso, sim.|yes|f","I can work on Saturdays, but not on Sundays.|Posso trabalhar aos sábados, mas não aos domingos.|saturday|f"]],
f:["Great. Do you have any questions for me?|Ótimo. Você tem alguma pergunta para mim?",["Yes. What time does the job start?|Tenho. A que horas o trabalho começa?|what time|g","When can I start?|Quando eu posso começar?|when|g2"]],
g:["It starts at eight in the morning.|Começa às oito da manhã.",["That's fine for me.|Para mim está bom.|fine|h"]],
g2:["You can start next Monday.|Você pode começar na próxima segunda.",["Perfect. Thank you!|Perfeito. Obrigado!|perfect|h"]],
h:["Great. We'll call you this week. Thanks for coming!|Ótimo. A gente te liga esta semana. Obrigada por vir!",["Thank you for your time.|Obrigado pelo seu tempo.|thank|end"]]}},
{id:"chat",title:"Conversa informal",intro:"Você encontra o Ben, seu vizinho, no elevador.",start:"a",nodes:{
a:["Hey! How's it going?|E aí! Como vai?",["Good, thanks. How about you?|Bem, obrigado. E você?|good|b","Not bad. And you?|Nada mal. E você?|not bad|b"]],
b:["Pretty good. Nice weather today, huh?|Tudo certo. Tempo bom hoje, né?",["Yeah, it's beautiful.|É, está lindo.|beautiful|c","Yes, but it's a little cold for me.|Sim, mas está meio frio para mim.|cold|c"]],
c:["So, what do you do?|E aí, o que você faz?",["I work at a bank.|Trabalho em um banco.|bank|d","I'm a teacher.|Sou professor.|teacher|d","I'm retired.|Sou aposentado.|retired|d"]],
d:["Oh, cool. Do you like it?|Ah, legal. Você gosta?",["Yes, I love it.|Sim, adoro.|love|e","It's okay. I work a lot.|É ok. Trabalho muito.|okay,a lot|e"]],
e:["Any plans for the weekend?|Algum plano para o fim de semana?",["I'm going to visit my family.|Vou visitar minha família.|family,visit|f","Not really. I want to rest.|Na verdade, não. Quero descansar.|rest,not really|f"]],
f:["Nice. I'm going to cook for my friends. Wish me luck.|Legal. Eu vou cozinhar para os meus amigos. Me deseje sorte.",["Good luck!|Boa sorte!|luck|g","Really? What are you going to cook?|Sério? O que você vai cozinhar?|what,cook|f2"]],
f2:["Pasta. It's the only thing I can't burn. Well, usually.|Macarrão. É a única coisa que eu não consigo queimar. Bom, normalmente.",["Good luck!|Boa sorte!|luck|g","That sounds good.|Parece bom.|sounds|g"]],
g:["Thanks! Well, this is my floor. See you later!|Valeu! Bom, este é o meu andar. Até mais!",["See you! Have a good one.|Até! Tenha um bom dia.|see you|end"]]}},
{id:"phone",title:"No telefone",intro:"Você liga para o consultório da Dra. Miller para marcar uma consulta.",start:"a",nodes:{
a:["Good afternoon, Dr. Miller's office. How can I help you?|Boa tarde, consultório da Dra. Miller. Em que posso ajudar?",["Hi. I'd like to make an appointment.|Oi. Eu queria marcar uma consulta.|appointment|b","Hello. Can I speak to Dr. Miller, please?|Alô. Posso falar com a Dra. Miller, por favor?|speak|a2"]],
a2:["I'm sorry, she's with a patient. Would you like to make an appointment?|Sinto muito, ela está com um paciente. Gostaria de marcar uma consulta?",["Yes, please.|Sim, por favor.|yes|b"]],
b:["Sure. Is tomorrow at ten okay?|Claro. Amanhã às dez está bom?",["Yes, that's perfect.|Sim, está perfeito.|perfect,yes|e","Sorry, I can't tomorrow. How about Friday?|Desculpa, amanhã eu não posso. Que tal sexta?|friday|d"]],
d:["Friday. Yes, we have two thirty in the afternoon.|Sexta. Sim, temos às duas e meia da tarde.",["That works. Thank you.|Pode ser. Obrigado.|works|e","Sorry, can you speak more slowly, please?|Desculpa, pode falar mais devagar, por favor?|slowly|d2"]],
d2:["Of course. Friday. At two thirty. In the afternoon.|Claro. Sexta. Às duas e meia. Da tarde.",["Okay, Friday at two thirty.|Certo, sexta às duas e meia.|friday,okay|e"]],
e:["Great. Is this your first visit?|Ótimo. É sua primeira consulta aqui?",["Yes, it is.|É, sim.|yes|f","No, I was there last year.|Não, estive aí no ano passado.|last year,no|f"]],
f:["Okay. Please come ten minutes early and bring your ID.|Certo. Por favor, chegue dez minutos antes e traga seu documento.",["Okay, I will. Thank you.|Certo, pode deixar. Obrigado.|i will,okay|g","Sorry, what do I need to bring?|Desculpa, o que eu preciso levar?|what,bring|f2"]],
f2:["Your ID. A document with your photo.|Seu documento. Um documento com foto.",["Oh, I see. Thank you.|Ah, entendi. Obrigado.|i see,thank|g"]],
g:["You're welcome. See you then. Bye!|De nada. Até lá. Tchau!",["Bye! Have a nice day.|Tchau! Tenha um bom dia.|bye|end"]]}}
],

/* Página "Por que este método funciona": [título, fonte, explicação, como o site aplica] */
method: [
["Lembrar é melhor que reler","Roediger e Karpicke, 2006; Dunlosky e colegas, 2013","Quando você se esforça para puxar uma resposta da memória, ela fica mais forte do que se você só lesse de novo.","Aqui você sempre responde antes de ver o gabarito: fala, monta ou escreve a frase, e a correção vem na hora."],
["Um pouco todo dia, com intervalos","Ebbinghaus, 1885; Cepeda e colegas, 2006","A memória esquece em curva. Rever logo antes de esquecer, com intervalos cada vez maiores, segura o que você aprendeu por muito mais tempo.","Cada frase volta em 1, 3, 7, 14, 30, 60 e 120 dias. Acertou, o intervalo cresce. Errou, ela volta para perto."],
["Misturar os assuntos","Rohrer e Taylor, 2007; Nakata e Suzuki, 2019","Praticar temas misturados parece mais difícil, mas faz você aprender a escolher a resposta certa, como na vida real.","As revisões misturam frases de lições diferentes e tipos de exercício diferentes."],
["Dificuldade na medida certa","Bjork, 1994","Exercício fácil demais não fixa; difícil demais desanima. O melhor é um esforço que você quase sempre vence.","O site observa seus acertos. Se você acerta quase tudo, os exercícios ficam mais exigentes; se erra muito, ficam mais simples."],
["Quatro partes iguais","Paul Nation, 2007","Um bom curso divide o tempo entre ouvir e ler entendendo, falar e escrever, estudar a língua de propósito e ganhar velocidade com o que já sabe.","A sessão diária passa pelas quatro: história com áudio, produção, exercícios de vocabulário e pronúncia, e rodadas rápidas."],
["As palavras mais usadas primeiro","West, 1953; Nation, 2001; Browne, Culligan e Phillips, 2013","Cerca de duas mil palavras cobrem a maior parte das conversas do dia a dia. Faz sentido aprender essas antes de qualquer palavra rara.","O curso segue as palavras e combinações mais frequentes da fala, sempre dentro de frases, nunca em listas soltas."],
["Entender muito, com poucas novidades","Krashen, 1982; Nation e Waring, 2020","Aprendemos quando entendemos mensagens um pouco acima do nosso nível, em grande quantidade.","Cada lição traz um diálogo curto em que você entende quase tudo, com áudio e tradução escondida que aparece ao toque."],
["Falar e ser corrigido","Swain, 1985; Long, 1996","Só entender não basta. Ao tentar falar, você percebe o que ainda não sabe, e a correção ajusta.","Toda sessão termina com você falando sobre a sua vida, e o simulador de conversas responde ao que você diz."],
["Frases prontas","Lewis, 1993; Wray, 2002","Quem fala rápido não monta palavra por palavra: usa blocos inteiros já decorados, como “Can I have…?”.","Você aprende blocos e troca só um pedaço para criar frases novas."],
["Explicar a regra ajuda","Norris e Ortega, 2000; Spada e Tomita, 2010","Estudos que juntam dezenas de pesquisas mostram que uma explicação curta e clara acelera o aprendizado em comparação com só exposição.","A trilha Gramática explica cada ponto e compara com o português. A trilha Natural oferece a nota opcional “Quer saber por quê?”."],
["Treinar o ouvido com variedade","Logan, Lively e Pisoni, 1991; Thomson, 2018","Para aprender um som que não existe na sua língua, você precisa ouvi-lo em muitas palavras e vozes, com correção imediata.","Na aba Falar, você ouve pares como ship e sheep em várias palavras, vozes e velocidades e escolhe o que ouviu."],
["Repetir junto com o áudio","Hamada, 2016; Foote e McDonough, 2017","Ouvir e repetir imitando o modelo melhora a percepção dos sons, o ritmo e a melodia.","Toda sessão tem de três a cinco frases para repetir, em velocidade lenta e normal."],
["Dormir faz parte do estudo","Diekelmann e Born, 2010","O cérebro consolida a memória durante o sono, entre uma sessão e outra.","O site pede de 20 a 30 minutos por dia, todos os dias, em vez de maratonas no fim de semana."],
["Motivação e escolha","Deci e Ryan, 2000; Dörnyei, 2001","A gente continua quando vê progresso real, sente que escolhe e não é punido por falhar.","Você vê o que já consegue fazer, escolhe trilha e lições, e nunca perde progresso por faltar um dia."]
],
polyglots: [
["Luca Lampariello","Tradução nos dois sentidos","Você entende o diálogo em português e, dias depois, tenta voltar do português para o inglês. No site isso aparece como “Tradução de volta”, três dias depois de cada lição."],
["Benny Lewis","Falar desde o primeiro dia","Não espere estar pronto. Já na primeira lição você fala em voz alta."],
["Steve Kaufmann e Kató Lomb","Muito contato com conteúdo de que você gosta","Fora do site, ouça e leia coisas do seu interesse. Veja as sugestões na página de prática."],
["Gabriel Wyner","Pronúncia primeiro e frases pessoais","Os sons vêm desde a primeira semana, e toda sessão termina com frases sobre a sua vida."],
["Paul Pimsleur","Recordar em intervalos graduados","Dentro da própria sessão, uma frase errada volta alguns minutos depois; depois, em dias."],
["Lýdia Machová","Gostar do método, quantidade, sistema e paciência","Escolha a trilha de que você gosta, faça todo dia, confie na fila de revisão e dê tempo ao tempo."]
],
outside: [
["Séries e filmes","Reveja um episódio que você já conhece, com áudio e legenda em inglês. Dez minutos por dia já contam. Comece por séries de comédia do cotidiano, que usam frases curtas."],
["Podcasts para iniciantes","Procure por podcasts de inglês lento para estudantes, como o “6 Minute English” da BBC (sotaque britânico) e os programas do site ESL Lab. Ouça o mesmo episódio duas ou três vezes."],
["Leitura graduada","Livros e notícias reescritos com poucas palavras. Procure por “graded readers”, pelo site News in Levels (a mesma notícia em três níveis) e pela Wikipédia em inglês simples."],
["Vídeos curtos","No YouTube, procure por “English listening practice for beginners” e canais de entrevistas de rua com legenda. Escolha assuntos de que você gosta: culinária, futebol, viagens."],
["Fale sozinho","No banho ou no trânsito, descreva em inglês o que você está fazendo, com as frases que já conhece. Não custa nada e funciona."],
["Mude um aparelho","Coloque o celular ou um aplicativo que você usa todo dia em inglês. Você já sabe onde ficam os botões, então aprende as palavras sem esforço."]
]
};
