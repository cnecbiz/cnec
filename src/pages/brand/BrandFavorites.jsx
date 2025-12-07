import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, FolderPlus } from 'lucide-react'

export function BrandFavorites() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">찜한 크리에이터</h1>
          <p className="text-gray-500">관심있는 크리에이터를 그룹별로 관리하세요.</p>
        </div>
        <Button>
          <FolderPlus className="mr-2 h-4 w-4" />
          폴더 추가
        </Button>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">찜한 크리에이터가 없습니다</h3>
          <p className="text-gray-500 mb-4">
            크리에이터 목록에서 마음에 드는 크리에이터를 찜해 보세요.
          </p>
          <Button variant="outline">크리에이터 찾아보기</Button>
        </CardContent>
      </Card>
    </div>
  )
}
