import { DCArticleModel } from '@/utils/model'
import axios from 'axios'
import cheerio from 'cheerio'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 게시글 목록 가져오기
 * @param 갤러리 id
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    // get params
    const id = await req.nextUrl.searchParams.get('id')
    const page = await req.nextUrl.searchParams.get('page')
    if (!id)
      return NextResponse.json(null, {
        status: 400,
        statusText: 'INVALID_PARAM',
      })
    // get html
    const $ = await axios
      .get('https://gall.dcinside.com/board/lists/', {
        params: { id, ...(page && { page }) },
      })
      .then((res) => res.data)
      .then(cheerio.load)
    // parse html
    let posts: DCArticleModel[] = []
    $('.gall_list .us-post').each((_, el) => {
      const gall_num = $(el).find('.gall_num').text()
      const title = $(el).find('.gall_tit').text().replace(/\t|\n/g, '').trim()
      const author = $(el)
        .find('.gall_writer')
        .text()
        .replace(/\t|\n/g, '')
        .trim()
      const date = $(el).find('.gall_date').text()
      const viewCnt = $(el).find('.gall_count').text()
      const likeCnt = $(el).find('.gall_recommend').text()
      posts.push({ gall_num, title, author, date, viewCnt, likeCnt })
    })
    // success
    return NextResponse.json(
      { data: posts },
      { status: 200, statusText: 'SUCCESS' },
    )
  } catch (error) {
    // error
    return NextResponse.json({ error }, { status: 500, statusText: 'ERROR' })
  }
}
