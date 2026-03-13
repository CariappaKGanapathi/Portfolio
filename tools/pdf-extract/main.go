package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/dslipak/pdf"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintf(os.Stderr, "usage: %s <file.pdf>\n", os.Args[0])
		os.Exit(1)
	}

	r, err := pdf.Open(os.Args[1])
	if err != nil {
		fmt.Fprintf(os.Stderr, "error opening PDF: %v\n", err)
		os.Exit(1)
	}

	var buf strings.Builder
	for i := 1; i <= r.NumPage(); i++ {
		p := r.Page(i)
		if p.V.IsNull() {
			continue
		}
		text, err := p.GetPlainText(nil)
		if err != nil {
			fmt.Fprintf(os.Stderr, "error reading page %d: %v\n", i, err)
			continue
		}
		buf.WriteString(text)
	}
	fmt.Println(buf.String())
}
