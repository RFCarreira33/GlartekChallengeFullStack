package types

type Weather struct {
	ID   int    `json:"id"`
	Name string `json:"name"`

	Weather []struct {
		Main        string `json:"main"`
		Description string `json:"description"`
		Icon        string `json:"icon"`
	} `json:"weather"`

	Main struct {
		Temp  float64 `json:"temp"`
		Feels float64 `json:"feels_like"`
	} `json:"main"`

	Wind struct {
		Speed float64 `json:"speed"`
		Deg   int     `json:"deg"`
	} `json:"wind"`
}
