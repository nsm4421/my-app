import axios from 'axios'
import cheerio from 'cheerio'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 게시글 상세 페이지 가져오기
 * @param id 갤러리 id(string)
 * @param no 게시글 id(number)
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    // get params
    const id = await req.nextUrl.searchParams.get('id')
    const no = await req.nextUrl.searchParams.get('no')
    if (!id || !no)
      return NextResponse.json(null, {
        status: 400,
        statusText: 'INVALID_PARAM',
      })
    // get html
    const $ = await axios
      .get('https://gall.dcinside.com/board/view/', {
        params: { id, no },
      })
      .then((res) => res.data)
      .then(cheerio.load)
    // parse html
    const title = $('.title_subject').text()
    const content = $('.writing_view_box').html()
    // success
    return NextResponse.json(
      { data: { title, content } },
      { status: 200, statusText: 'SUCCESS' },
    )
  } catch (error) {
    // error
    return NextResponse.json({ error }, { status: 500, statusText: 'ERROR' })
  }
}
