// DC 게시글 목록 List
export interface DCArticleModel {
  gall_num: string // 게시글 id
  title: string // 게시글 제목
  author: string // 글쓴이 닉네임
  date: string // 작성일자
  viewCnt: string // 조회수
  likeCnt: string // 추천수
}

// DC 갤러리 id목록
export const DCGalleryIDMapping = [
  {
    id: 'dcbest',
    label: '실베',
  },
  {
    id: 'stream_new1',
    label: '스트리머',
  },
  {
    id: 'leagueoflegends4',
    label: '롤',
  },
  {
    id: 'hiphop_new1',
    label: '힙합',
  },
]
