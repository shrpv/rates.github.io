var Rates = function() {

    this.nodes = {
        rate: document.querySelector('#rate-value'),
        priceVaue0: document.querySelector('#price-value-0'),
        priceVaue03: document.querySelector('#price-value-03'),
        priceVaue05: document.querySelector('#price-value-05'),
        priceVaue07: document.querySelector('#price-value-07'),
        priceVaue1: document.querySelector('#price-value-1'),
        priceVaue12: document.querySelector('#price-value-12'),
        priceVaue15: document.querySelector('#price-value-15'),
        priceVaue17: document.querySelector('#price-value-17'),
        priceVaue2: document.querySelector('#price-value-2')
    };
  
    // ENNLO LINKS
    this.ennloRate = 'https://ennlo.com/api/v1/offers/direct/92';
    this.ennloBuy = 'https://ennlo.com/offers/direct/92';
    this.ennloWallet = 'https://ennlo.com/wallet';
    this.ennloWithdraw = 'https://ennlo.com/wallet/BTC/withdraw';
    this.ennloDeposit = 'https://localbitcoins.net/accounts/wallet_receive/';

    // LOCALBITCOINS LINKS
    this.LBContacts = 'https://localbitcoins.net/ads/contacts/finished';
    this.LBReviews = 'https://localbitcoins.net/accounts/profile/J0bs/feedback/';

    this.LBAds = 'https://localbitcoins.net/ads#ads';
    this.LBAdEdit = 'https://localbitcoins.net/ads_edit/756821';
    this.LBAdPreview = 'https://localbitcoins.net/ad/756821/kupit-bitkoiny-bank-sberbank-sochi-ufa-vtb-roketbank-russian-federation';

    this.LBTopSberbank = 'https://localbitcoins.net/ru/buy-bitcoins-online/ru/russian-federation/banks/?q=%D1%81%D0%B1%D0%B5%D1%80';
    this.LBTopVtb = 'https://localbitcoins.net/ru/buy-bitcoins-online/ru/russian-federation/banks/?q=%D0%B2%D1%82%D0%B1';
    this.LBTopRoсketbank = 'https://localbitcoins.net/ru/buy-bitcoins-online/ru/russian-federation/banks/?q=%D0%A0%D0%BE%D0%BA%D0%B5%D1%82';

    this.price = null;

    this.getPrice();

    this.timerID = setInterval(function tick() {
        this.getPrice();    
    }.bind(this), 10000);
}

Rates.prototype = {
    getPrice: function() {

        var xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.open("GET", this.ennloRate, true);

        xmlHttpRequest.onload = function (){
            var json = JSON.parse(xmlHttpRequest.responseText);

            this.price = Math.round(json['offer']['current_rate']['value']);
            
            this.render();
        }.bind(this);

        xmlHttpRequest.send(null);
    },

    render: function() {

        this.nodes.rate.innerHTML = this.markup(0);
        
        this.nodes.priceVaue0.innerHTML = this.markup(1);

        this.nodes.priceVaue03.innerHTML = this.markup(1.3);

        this.nodes.priceVaue05.innerHTML = this.markup(1.5);

        this.nodes.priceVaue07.innerHTML = this.markup(1.7);

        this.nodes.priceVaue1.innerHTML = this.markup(2);

        this.nodes.priceVaue12.innerHTML = this.markup(2.2);

        this.nodes.priceVaue15.innerHTML = this.markup(2.5);

        this.nodes.priceVaue17.innerHTML = this.markup(2.7);

        this.nodes.priceVaue2.innerHTML = this.markup(3);
    },

    markup: function(delta) {
        var price = Math.round(this.price +  (this.price * delta / 100));
        
        return price.toString().replace(/\B(?=(?:\d{3})+$)/g, ' ');
    }
}

var rates = new Rates();