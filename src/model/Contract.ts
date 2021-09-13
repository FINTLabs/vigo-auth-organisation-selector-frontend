

export interface Image {
    base64Image: string,
    mimeType: string
}

export interface Contract {
    cardId: string,
    displayName: string,
    image: Image

}

