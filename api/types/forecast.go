package types

type Forecast struct {
	City struct {
		Name string `json:"name"`
	} `json:"city"`

	List []struct {
		Main struct {
			Temp    float64 `json:"temp"`
			TempMin float64 `json:"temp_min"`
			TempMax float64 `json:"temp_max"`
		} `json:"main"`

		Weather []struct {
			Main        string `json:"main"`
			Description string `json:"description"`
			Icon        string `json:"icon"`
		} `json:"weather"`

		Wind struct {
			Speed float64 `json:"speed"`
			Deg   int     `json:"deg"`
		} `json:"wind"`
	} `json:"list"`
}
