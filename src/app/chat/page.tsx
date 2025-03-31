import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2 } from "@/components/ui/typography";
import {
  Circle,
  Ellipsis,
  House,
  Phone,
  SendHorizonal,
  Sparkles,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const chats = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatarUrl:
      "data:image/jpeg;base64,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",
    lastMessage: "Chào bạn!",
    time: "10:00",
    isRead: true,
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatarUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xABAEAACAQMCAwQIBAMHAwUAAAABAgMABBESIQUxQRMiUWEGcYGhscHR8BQyQpFSwuEHIzNicrLxotLyFRYkNEP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQMCBAX/xAAjEQACAgIDAAICAwAAAAAAAAAAAQIRAyESMUEiUQQTIzJC/9oADAMBAAIRAxEAPwDSYp2KXFKBSEIBTgKUCnAUAIFpwWlApwFAjgKcFpQKXKr+fljNMDgKhvb22sITLdzJEni5x/zWb9KvTKPhP/xrNDNdEdeS+uvLuMcVveJTmS7nZ3P7CsufhtY9Wel339pHCYJWWKGecD9QCge8591BXH9ptj2GuGzmD52D4w3ltXl+cYBw3kK6REKbAg+AosKRu2/tOvHkzHawxRg7K5LH79langfpxaX+hLuIRuf1o2oftXjFvFqYK5jCHxFX3D+HQTOqxTmNxzwMI3gBvzNZk2tm1FM92hkjuIxLEwZTyK8qeVrzjgHHLrgs0cV4zGFzjPj/AFr0aCRJ4VkjIKsNiKePIpE8mNwOK0mmpcUhFUJkZWmlakIpMUxDMUmM08iuAoAaF3xU8MG9Oij1GjoosCgBgg2FdRGrFdQBlAKcBThXVgodilApaUCmIXFOApQKdsFJJ9Q8aAGscADIGfGsX6a+lo4cWtLFka45Fz+j+tWnpbxtuF2MnZMv4lhhNR2Xz9deMzTSXE7yTMz5P5id2PjU5PwpCPo+eaSQtLK7Eu2S7fmahrhpG2CYXpU+rQNRA1DkOgotbIzzFhGD0XJ5Vi67Lcb0iqiiyRjKk+FWC2LSRnskYnocc6veEejUglWa4YOTywOVbC04ZBHGE0jbxrEs30NYfs8rl4fdQJreFj545UOlw8bhneQEctJ5V7JLwqOWPCKM+QrJekvoiOzae3Xvc8YpxyeMTx/QHwa5ivYFiur1g36DJuB4c81t+A8ZmspVtJ1ByNSEHIcevxrynh6vHOIJhpGrYZ65/rW64RN+IWO3kixpfTseuPpWJ/GVopFco0z1KCVZ41kXkwz6vKnkVhvR3jEtpxFrG6cFQ2x8a3isHUMCDnwrqxzUjjywcGREU3FSkU0iqEhmKeiajSquTRUSUAPhTAqVjoX112dC+uhppNjQBxk3rqhC5FdQIqKdSU4VkqcBTwKQU4UCHKKEvLkxRSMMYUZOeW1EvnScHG1Yr+0Li6WXC2tFY9rMNI9XU1luhpbMb6WcUW94hJHDIZQjH+86H1e3NZrO6ljz5LSM4DYwBt060qLmU5zpyOXrFTRfonjy8iL49K0XDFLSbcgxHvqgtTrmBhUDbGrz861nB7NljTXzzuT1NQyvw6cS1Zo7WIaVxVpCufZQdrHtVjAukGpxQSYXbxk8qmuIEaEgjO1Ps+lT3EJIGPGuhLRBy2eP+mXChY3kU0K91jn21JwviMv41QgxlxIfXjf3g1pfT+1DcPDgZKHpWBguXtpfxKICEbSR0I8P2xUnvRZfZqLtPw3EZLpXbQrZkUrnG+5rfej/ABPt4yFOoDGpR1z1rEWjNe2ovYwpZBgry1L1BHiPeKs/R26WymSGL/ClBYH+AhsYoxvizGaPKJ6HsRkcqbjeuh5Ng93Vt+1Or0E7PPFjXeil2FQJtUjHagBJHx7ahVdRpwGo1Oq4FADRHtXVLiuoEZ4V1dSislRRTxzFIppQ24HjQZBb+QxJldyTjHjXiHpbxE3vFJn7XtEB0ofKvUvTviAsOFzMH0yPCY09Z2+Ga8XlGrvN7anLstBUrEiVSoZzhRzpVYBCQc75pGGlV09c4p0JCqB0U5pWbSD+Gs9vGkrW7OhkBXT477VpoOLcRjj1HgkojU/mz0qis5nslDNnSd0A61ZweknE2cJb2zOpHLTyNQa5Pou2ors1HCuPW91pjMTxyeDCr+KYPHv+bmKxf/qN0iZvLXRJp1ahGRjyzWm9H9XEYQyuNs5IqUrs1Sqx196TQ8KkAlSRyd8RrqNSWvpddXwxa8DvWUjm6hc1Tekt1Lw+XTDEWz+VtOd/Oqew9K+MwSaZLV2CnmsfwyMe+rRbJzSZqOO3Rvrd4Lm1mt3ZMgSLlTjmM15pe7MVGNPeJHifH3CvS7bjLcbspVkibIXOooy7eojIP3mvNeLRFL1+exzsetZ/0aj/AFLj0b4jPbuQo/u5ToIHME5+tWnDOJWwvo1YFZVkw6EbEHkaD4DbPJbSxqoLGImLyJHWhbFoZLqydlxLjRIp6MM/H5VmtmvD1/g0unManKsuRvnB61aNuc15/wCiF1ci4lguG1KgOgnnz3H78q9Ai78St4iuvDPkqOHLHizhT1XNdgDnUct0sQznFWsiFKAOdO26UHBcCfkc0Yi4x5UAOrqaz4JrqBGdpwrhThWSjFFOApQKD4pdLZWjysfygnGfKk3SEtswX9ol1HdcQhtHOI4ULv8AKvN5hnVvnFXPGrlrq8lldstIck5qoRDLJoHPIqCduzscaVEcxBCA+VKvchlRzjPxrrgKRED4HV+9OaB3ijIA1OMe2tWjNPouOBp2tlh23Rttq2vCrR5YA6mNDjZtGTWT4TB2cSRFw2PzY6Hwre8NIhtQWOEC865JS2dnGooruJWrBVEk7Ff1EjFX/ojCkUegHCaB8Kz926XkzNPhVx3QzYGPGtJwWWJYwC2w2wDnI9dKL2ZnGo6Db/hcd0nZschuW+KAteAy27hY3Up/mjwas7ye14jazx2MmZ0XuBGzpYciaB4Txd3UR3A0yp3WXwqrasioy4sJuoPw8DIxz3STXjPEVnlvZNs6mI9vSvaeISrJBJ/pryKWV14lMRG2DKyEHqM4+VZvZWC1sN4DcTxTKsOFmA1EHkxXfH7Zq2e0KSNdSqitK+Rp5BcZB9oPurPWryNcsytoJbUjeDeHwrYsO04bEZwOykQwsV//ADypz+xGPbSl2DF9HBLJcROWOWkKHx3zj516NZS4VYnOmRVJAH6sbVgfRS4EIWC6QpNA5jfPXwNbGOTTKsh/zAe3GfgKrglTOb8hW0O4lei3Qt0xVFDJLxGcgtiP40XxFHuGbbLHnTeF2UqSAEYFdL2cZZ2Qjs0AzjTRQ4tG76dVMnsO2TSaEi4THbOHxmt7QizMmo5Dc6SnJPEFA011GwKoU8U0U8UjY5dt+orHf2gcQEFqsESapZEbPkNt61d1cLbW0sz5wiFtqxvpFaiK7hkmlWSaW3ftm6Abch4D51jI9FMa2eXNn8L2h/Nk++pOFxxh9T/lDBD5Z511wAi9mMAZxt0oqziRYA4H6XbHngAe81zt0jrStlZfQlJzG35ojpNF2+mOD8Qwz2Kk48d6hnEhvijjUwUBvWKMSHVbd0g9zUUPXGfrn2U26QJbsueDRIYpBGcqDqU+IPKr6e9jtLSMXMiopGRrOBWM4JfrZTKk5IMxIP399K03EIFvbCLV3tDFW8s8vvzrnnFp76LxlyiDC+juW7umQeK7irnhzwrgaJQfALsaouAXr8Jf8KLKG6jDhgrHSw3zzwfZW84R6QWwSGU8EZWQsSS8YAJ9u/PwqkYRfTMym14FWfE7K3tuzReyA5gAb1TXPErC44lptLmJ5xsyIckHzrQS8SuJIWaKwhtFOVR2OvrkHGAPYM9N6pl4FbW11ZSxpiTWzzOfzPnfJOOZO/trWRfEnF07Cbhits5lOBivG4b55uIuz97XMSmOmTnFek+nfGV4Xw3C7zTsFVfEdfvzrz7h/D/xHHFCqVhLdpnppPifL5VnGqi2xylbSRey2/Y3B0DUuA5I/SSucVpuBXSOksMoHZsoOk+Gdz8/YazkV6LniV0VwV1BBg51Dl9asrF3tuJhoeWM4PL8uMfA+01Fst2i2QLb3cWpjkDD5/VsB/X21qrWQm3CndlIGfGsreBWZJIuRH5fDFXfBbhWjZecgAz7OdPG6kRyxuJo7W2Bd1YZKmrOG1Ub4xQfDmTT2kb6lkOqj2evSj0ea+yK7lWJeWaq2v1kBXGKtnhEqkEZFZjjMcts2uNdlNabEI0d6xJEuxrqMtLyN7aNtPMUlZsQgp4AyM0gp3Q9cDlTNlV6R8Sh4fw6Z5MEsNKr1Y+VeV8b4lNOf75z2mkRlf4VH/FbzjkEJhuJGxn8VE2o/wCoDHurzb0gUW/Fr6IZ/wDsMVJ8KhkR04aKyRixLHbpirjhUvZxKh6Rso9exFUpQuyDp0q2tY+7bEnAaUKPM8vkalJaOiKAo9Md2sx/PIuV9g/pU2prdAyEDswG35aufzNMljiWBSdmjcx48dzvRlpGtzYrJGNZEeCmM7gg5+NJj+yi44jR3pUqFA/QP0eVaH0W4q0sPY3BywGnPiKzXEHMkokPUlueeeTU/AHKylQcb1WcbxkYSayG+jsEmlRmyGHJh4VeW1pLsBMSo8apuDXsZZIp2CSfpY9a1tuuMFQo8a5YnVOTQRY2j6gZmZiOWadxSWK2iLvjA8evlUpv44IiXIzjYDrWa4nK927O59QHStSkRinJ2zz307uLi8vY5pFONRVB4DpQcF7dW0RtYpmWJRpYL1NX/H7EXEBUjkaoWAWJBIQjFtTA9Tyz7q3GacaHKL5WWnDYTb2qFTgk5z9+utlAkUvDzcocswJx57A/SspcqIEUDUWKKAPWM5+/GtF6PTQi2EU5OSmdPTfII93vFQlt2XWkNguN3D7FjqUeAOF+VX9sy2kqStzP0rJW0sqcQnFw0e7nRtyGokVbm4E0kcYfOBkkHY74pemGrN1wtkl06HKkKWUDr4VbwHUoGTnrnxrJcHkd3jjiAEiMdOTzGOVaSO50ZypRwdLAnau/DO0edmjTDrm4EMPe5CqlJY+IudR7vQeNQcQZr6YQB8KOZNEW9sLSLUd8ch4VYiKLVUGlV2HKuoKTirByAtdQImBxQ97ctBbSOgy+k6fDPnRHUDrVfxW6iWFoRvK+yrjmaTZRbZ59xjjUsELCNGlZpQzSuNtX8KjyNYy6neYtJO2qSRixPic1dcbDR28UKnvrM+N+n2Kz0zFm1ciCdqgdSVIdDKUZT/CdqtYQ8cduzsSkEjb/AMJOMH41UJnd5OQ5UYsjR27I4JjOAwHurM0VgyS47OVZixMbGXUrYzhSPD2U/hUxsXR0caCCQxHLwP30zUF6oilhgDlpCMZ6eFEXhTspIrZSCBpyeZHX3gVnygtdlbe2suZpNJaNThmUZC+vwpnCsCVmXlkYoiD8RJMiwu6MUKyEHcgePjtS8Lh1SsQMDVsMVRv4kor+Q0sSdpEjVoeGINC5qi4S3f7OtFZ/3ZxXGdj6LIIMbUPcL3akaSoWbWDQTWijvwNBBXOTyrP8SQl8afy7hvCtZd22req+Pgd3xOYQQghCf7yTGdArcE2zTmqspBcfiLVe13ljOkH+MDl86tAksSCe3BchSRg4wTWp/wDbHDLW3KRxguFwJH3JPjVJJZ3FveSzhC0UgCnu7Ct5MTiYhmUih4xMO3SYZGrOVxjHiD555+yrPgTL+VzsxP7eVbb0f4NDJYT/AI22jb8Qf1LvjA+lDn0OsllH4XXCPAHIzWv0txVGP3JPYJwm7MfEWtVOoRqNLDr5ever+3lmuhKHdlJkyUHQDxoKy9FJ7K712rxNGcbFiGzVna2HELa6u55YxobGjfO2OvvrWPHOPZDJOMuguw0pqd+pomftblSFOF6U2zte2AdWyr97ceNWUojtrcljggV1eHKzLTcOZpWOqkptxxMtO5RMrnY11ZEWROBk8qxfpHcz2EUjRErrY62A7+MVq7h9EbOSe70HWvOvTPinZRSQR5Mk2zf5RSmXgYy4neU6pCxOOpzUR78LY5jFNZ9JznJPOozIXIUdan4dFhNqpWdGZdSgbL50TOkk27sqheYLY1Hw91RRydmYtAGVyCT0o2KZDbnWqsyksoHNc8x7hU5aKRAp5Q91C77FMZ9Y+/dVjO/4m7jkhUAOuJV8D1/fnQnCkSWYySIJBtsx2zV1waxf8a4mOAkmCMb+2irdCelY/hfAGBWU7KGPLnv8q0h9F4JnM9uBDO27YHdY/Krm2hQw6QMHFHWmUbS3L+tdHBNUzm5tO0YhuCX1ldiWS3cxk/4id4fv9at3RUwcgZFbEqvMHB60n4WOXvSRRMD4rmpP8deMovyH6jFtMoI71SIZZiFt4pJW8EXIFawcNtAdX4WDV4lB6vnU6DAwiqo/y/flSX47vbG86rSM5a8Amm715J2SdYl3Y+s9KvIrRYIRFCojQclFGADPx+/ZUiruPKrxxqJGU3IrEsjKxBXnRyWUUYPcBO5Gf3+lEBdI9QHypHfoen9K2TsjZAu0eNXQDy/4FQ3EogiJG7HkPHH/AAKlaQRxamOMH6Z+FVsamebBOcd3+X4mgZZcOJUqrtmU95j/AA+X75qwMigMjnKkHI8vCgbc4eWX+I4HqH2afE2o586Zl9h8AS3jVU/KBhR4Cg75Hu/7sNgNzomMjGluRqUBV586KMlYOGxKMCPYV1GPMoY11FAZLil5+DheZjhFHe8/KvJuP8Ra7uHOjRGpOhfCtl6bcSFvbqhYksQEUda89vZJZXMkwAY76RUJ9nTBAr47PcZqNSApIXpj20/tHIyTgD9NRzGVl55VuQoZoOtQI4e1kAd5GwgP7VJdShUYRqFOCMDxNMgUCKOQuudWnunJXb64pbyNzG8yoRqfYqM5/wCKk+yt/EI4UmiDvjwyc5ra8ItjDEikb9TWQ4QGmEhQ9mG7uknbI8B7q9DsIJFih7XGsgZwMeutQXyszklqi7t0wiev510ndm9nyp1v/h6ug39wz7wakuEySfX8xXQcwbFunqz/ADU5e61DWr5XT4jPw+tEZzv4jHuP1piH88ez5fSuA2Hs+A+tIrdfP6mndT6/p9KAFO6/fXP1qdTufb86GA7wH+n+UVPHvp88e8D60CY87qfb86ik/UfI/wA1SA5UH2/vj60PITsB5fL60CQNcuW2HIMR7yPmKisXXtw3U97/AGn5UkkwVA3qY/8AQaZFGRFIR1Qj9gw+VBosbXVJBH4EA+4VOW7FdKfmNdGoihVF6KB7qhdhv1bqPv20zIVCx2ZudETE6VI60HDy8fOj3TVbf6e9QICdm1mlqJp8MRXUAeN+naok8EmGMu5bPgazco7wZ219djjAo3it7c8Su/xN1gHAKqDnSPCgLs538RmudnWlSB3bW+lBjqMHO9QcpcSdNz66XLAYXqedOlOtlZiNQOGJ8KYgu1WNYXd86juoHMmpB2j/AN1CpCsc6T1+wKW1ZVQB899sBl6Gu4KZHvS2vn3cYzn7xU62UvRpfRnh627prXJc5x/Dgj5Gt5HB3RnkCffVRwXh0cA7XGZGIBZjuB5e6tBjUoGMZ3z7/iDVoIhNhMA7qk8zj34+tKdwAeoHyPypUGUyvPf+nyrnHdKryyfn/wBwrZhjYBpUD72x9KJXmo9X8o+VQYySR1yP931qYtpZm+/1fSmIWPkPvmB9alLcx5n4MfnUSjS6jwbHvH0p6DUg81x7l+tADhs+PB/gT9KmjHeHs/lHyocnmfWf9xogfn9X1NMyOXkvs/loWdtKL7PilGD8y+r6UHc7DPhj+WkwRTzMTKEHVP5DV5awERkdS/8AM1U1rH2tzn1D91YfOtPGO6D4gH99/nQNkDjs1AHLw+/ZQTHLDf2/fsNF3z9m2ce37+9qCiGuTkCSf3+/nQwQbacztjyq1UDsyrcmGDQVounAzjl/z9+FFkkbimZZRvbyhyG5g711XWhW3PWloA+apnSOLSCSxXw61X3QYPo2xjaurq50dbI1VSCvUU1A0r52wPGurqBIMUyNbZwuSdz1AFGeii6uIKoJJDEgmurqyjcuz1i2jCIFHTA9v2RRyjYMefM/H5Gkrq6TmCY20g+Xy/8AGnnu7eDfD/xrq6gRyDDL9/wj5UinO/iPiB9a6uoELr5n1n/eamQ98D/MB/1L9KSuoAXOQf8AQf8Ab/Wp1Pfb/Ufi1dXUxE36R6/nQtx09nxSlrqAQBwtdNz7FPvX/urQIdIjTxxXV1APsA4gNyM433PlTLYKF2G2+R5b7fH9qWuoDwsIzjz+/v8Aep2OVrq6gQ0cqSurqAP/2Q==",
    lastMessage: "Hẹn gặp lại!",
    time: "09:30",
    isRead: false,
  },
];

const ChatCard = ({ chat }) => {
  return (
    <div
      className={`${
        chat.isRead ? "" : "border-l-3 border-l-green-500"
      } flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-200 ease-in-out`}
    >
      <Image
        src={chat.avatarUrl}
        alt={chat.name}
        width={40}
        height={40}
        className="rounded-full mr-3"
      />
      <div className="flex-grow">
        <h2 className="text-md font-semibold">{chat.name}</h2>
        <p className="text-sm text-gray-500">{chat.lastMessage}</p>
      </div>
      <p className="text-xs">{chat.time}</p>
    </div>
  );
};
export default function ChatPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex-shrink-0 w-1/5 border-gray-300 border-r rounded-tl-xl rounded-bl-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
            <h1 className="text-lg font-semibold">Tin nhắn</h1>
            <div>
              <Link href="/" prefetch={false}>
                <Button variant="ghost" className="ml-2">
                  <House className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" className="ml-2">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              <Input placeholder="Tìm kiếm" className="w-full" />
              {chats.map((chat) => (
                <ChatCard key={chat.id} chat={chat} />
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-300">
            <Button className="w-full">
              <Sparkles className="h-4 w-4" /> Chat với Vercel AI
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-grow flex flex-col border-gray-300 border rounded-tr-xl rounded-br-xl">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold">Lâm Tiên Hưng</h1>
            <div className="flex items-center space-x-2">
              <Circle fill="green" color="green" width={10} />
              <p className="text-sm text-gray-500">Đang hoạt động</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 p-20 pb-2 pt-10 overflow-y-auto flex-grow gap-4">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={chats[0].avatarUrl}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
            <TypographyH2>Lâm Tiên Hưng</TypographyH2>
            <p className="text-sm text-gray-500">
              Lập trình viên Full-stack tại Google
            </p>
          </div>
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-950 px-2 text-sm text-gray-500">
              Hôm nay
            </span>
          </div>
          <div className="flex items-start space-x-4">
            <Image
              src={chats[0].avatarUrl}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg max-w-xs">
              <p className="text-sm">{chats[0].lastMessage}</p>
            </div>
          </div>
          <div className="flex items-end justify-end space-x-4">
            <div className="bg-green-700 text-white p-2 rounded-lg max-w-xs">
              <p className="text-sm">Hẹn gặp lại!</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center p-2 space-x-4">
          <Input placeholder="Nhập tin nhắn của bạn..." className="w-full" />
          <Button variant="ghost" className="h-10 w-10">
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
}
