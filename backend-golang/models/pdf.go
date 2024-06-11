package models

import "time"

type PdfList struct {
	Pdfname        string `json:"pdfname"`
	Appnumber      string `json:"appnumber"`
	PdfCreatedDate time.Time
	Statement      string `json:"statement"`
}

type PdfDetail struct {
	Owner string `json:"owner"`
}
