interface InterviewIdentitySource {
  anonymous?: boolean;
  guest?: string;
  affiliation?: string;
  role?: string;
}

export const getInterviewIdentity = (data: InterviewIdentitySource) => ({
  name: data.anonymous ? '匿名受访者' : (data.guest ?? '未署名受访者'),
  affiliation: data.affiliation
    ?? (data.anonymous ? '系所信息保密' : (data.role ?? '系所信息暂未公开')),
});
