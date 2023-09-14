export type Course = {
  code: string,
  name: string,
  instructional_type: string,
  credits: string,
  standard_year: string,
  module: string,
  period: string,
  classroom: string,
  instructors: string,
  overview: string,
  remarks: string,
  updated_at: string
}

export type Material = {
	id: string;
	teamId: string;
	url: string;
	height: number;
	width: number;
}
