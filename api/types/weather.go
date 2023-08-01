package types

type Weather struct {
	Name string `json:"name"`

	Weather []struct {
		Main        string `json:"main"`
		Description string `json:"description"`
	} `json:"weather"`

	Main struct {
		Temp    float64 `json:"temp"`
		TempMin float64 `json:"temp_min"`
		TempMax float64 `json:"temp_max"`
	} `json:"main"`

	Wind struct {
		Speed float64 `json:"speed"`
	} `json:"wind"`
}
