export type Instance = {
	id: string
	name: string
	version: string
	owner: {
		name: string
		avatarUrl: string
	}
	build: {
		commitHash: string
		createdAt: string
	}
}
