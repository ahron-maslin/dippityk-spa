export interface PRODUCT {
    readonly id: number;
    readonly name: string;
    readonly displayed_name: string;
    readonly image: string;
    readonly price: number;
    quantity: number;
    added: boolean;
}

export interface ITEM {
    readonly id: number;
    readonly name: string;
    price: number;
    quantity: number;
}

export const Products: PRODUCT[] = [
    { id: 2, name: "olive_black", displayed_name: "Olive Dip (Black)", image: "../assets/images/black_olive.jpg", price: 20, quantity: 1, added: false },
    { id: 1, name: "olive_green", displayed_name: "Olive Dip (green)", image: "../assets/images/green_olive.jpg", price: 20, quantity: 1, added: false },
    { id: 3, name: "matbucha", displayed_name: "Matbucha", image: "../assets/images/matbucha.jpg", price: 20, quantity: 1, added: false },
    { id: 4, name: "tomato", displayed_name: "Tomato Dip", image: "../assets/images/tomato.jpg", price: 15, quantity: 1, added: false },
    { id: 5, name: "chummus", displayed_name: "Chummus", image: "../assets/images/hummus.jpg", price: 15, quantity: 1, added: false },
    { id: 6, name: "tehina_reg", displayed_name: "Tehina (regular)", image: "../assets/images/tahini.jpg", price: 15, quantity: 1, added: false },
    { id: 7, name: "tehina_green", displayed_name: "Tehina (Green)", image: "../assets/images/green_tahini.jpg", price: 20, quantity: 1, added: false },
    { id: 8, name: "eggplant_tehina", displayed_name: "Eggplant Tehina", image: "../assets/images/eggplant.jpg", price: 20, quantity: 1, added: false },
    { id: 9, name: "coleslaw", displayed_name: "Coleslaw", image: "../assets/images/coleslaw.jpg", price: 20, quantity: 1, added: false },
    { id: 10, name: "moroccan_carrots", displayed_name: "Morrocan Carrots", image: "../assets/images/carrots.jpg", price: 20, quantity: 1, added: false },
    { id: 11, name: "beets", displayed_name: "Beets", image: "../assets/images/beets.jpg", price: 20, quantity: 1, added: false },
    { id: 12, name: "onion", displayed_name: "Onion Dip", image: "../assets/images/onion.jpg", price: 15, quantity: 1, added: false },
    { id: 13, name: "schug", displayed_name: "Schug", image: "../assets/images/schug.jpg", price: 20, quantity: 1, added: false },
    { id: 14, name: "green", displayed_name: "Green Dip", image: "../assets/images/green.jpg", price: 20, quantity: 1, added: false }
]
