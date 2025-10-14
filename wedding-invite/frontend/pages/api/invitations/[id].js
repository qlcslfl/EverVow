// 청첩장 데이터 조회 API
import localDB from '../../../utils/localStorageDB';

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  if (method === 'GET') {
    try {
      // localStorage에서 실제 데이터 조회
      const result = localDB.getInvitationById(id);

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        res.status(404).json({
          success: false,
          message: result.message
        });
      }

    } catch (error) {
      console.error('데이터 조회 오류:', error);
      res.status(500).json({
        success: false,
        message: '서버 오류가 발생했습니다.'
      });
    }

  } else if (method === 'PUT') {
    // 청첩장 수정
    try {
      const updateData = req.body;

      // localStorage에서 실제 수정
      const result = localDB.updateInvitation(id, updateData);

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.data,
          message: '청첩장이 성공적으로 수정되었습니다.'
        });
      } else {
        res.status(404).json({
          success: false,
          message: result.message
        });
      }

    } catch (error) {
      console.error('데이터 수정 오류:', error);
      res.status(500).json({
        success: false,
        message: '수정 중 오류가 발생했습니다.'
      });
    }

  } else if (method === 'DELETE') {
    // 청첩장 삭제
    try {
      // localStorage에서 실제 삭제
      const result = localDB.deleteInvitation(id);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message
        });
      } else {
        res.status(404).json({
          success: false,
          message: result.message
        });
      }

    } catch (error) {
      console.error('데이터 삭제 오류:', error);
      res.status(500).json({
        success: false,
        message: '삭제 중 오류가 발생했습니다.'
      });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
